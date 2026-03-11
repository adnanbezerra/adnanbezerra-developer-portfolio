import type { Express, Request } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
    httpServer: Server,
    app: Express,
): Promise<Server> {
    app.get(api.locale.detect.path, async (req, res) => {
        const detection = await detectPreferredLanguage(req);
        return res.status(200).json(detection);
    });

    app.post(api.messages.create.path, async (req, res) => {
        try {
            const input = api.messages.create.input.parse(req.body);

            const webhookResponse = await sendN8NWebhook(input);

            if (!webhookResponse.ok) {
                const text = await webhookResponse.text();
                console.error("Erro n8n:", text);
                return res
                    .status(500)
                    .json({ error: "Erro ao enviar mensagem" });
            }

            res.status(201).json({
                success: true,
                message: "Mensagem enviada com sucesso",
            });
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: err.errors[0].message,
                    field: err.errors[0].path.join("."),
                });
            }
            throw err;
        }
    });

    return httpServer;
}

const PORTUGUESE_SPEAKING_COUNTRIES = new Set([
    "AO",
    "BR",
    "CV",
    "GW",
    "GQ",
    "MO",
    "MZ",
    "PT",
    "ST",
    "TL",
]);

function normalizeCountryCode(value?: string | string[] | null): string | null {
    const countryCode = Array.isArray(value) ? value[0] : value;

    if (!countryCode) {
        return null;
    }

    const normalized = countryCode.trim().toUpperCase();
    return normalized && normalized !== "XX" && normalized !== "T1"
        ? normalized
        : null;
}

function getCountryCodeFromHeaders(req: Request): string | null {
    return normalizeCountryCode(
        req.headers["cf-ipcountry"] ??
            req.headers["x-vercel-ip-country"] ??
            req.headers["x-country-code"] ??
            req.headers["cloudfront-viewer-country"],
    );
}

function getClientIp(req: Request): string | null {
    const forwardedFor = req.headers["x-forwarded-for"];
    const firstForwardedIp = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor?.split(",")[0];

    const ip =
        firstForwardedIp?.trim() ??
        req.headers["x-real-ip"]?.toString().trim() ??
        req.socket.remoteAddress?.trim() ??
        null;

    if (!ip) {
        return null;
    }

    return ip.replace(/^::ffff:/, "");
}

function isPrivateIp(ip: string): boolean {
    return (
        ip === "127.0.0.1" ||
        ip === "::1" ||
        ip.startsWith("10.") ||
        ip.startsWith("192.168.") ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) ||
        ip.startsWith("fc") ||
        ip.startsWith("fd")
    );
}

function detectLanguageFromAcceptLanguage(req: Request): "en" | "pt" {
    const acceptLanguage = req.headers["accept-language"]?.toLowerCase() ?? "";
    return acceptLanguage.includes("pt") ? "pt" : "en";
}

function mapCountryCodeToLanguage(countryCode: string): "en" | "pt" {
    return PORTUGUESE_SPEAKING_COUNTRIES.has(countryCode) ? "pt" : "en";
}

async function lookupCountryCodeByIp(ip: string): Promise<string | null> {
    const providers = [
        {
            url: `https://ipapi.co/${encodeURIComponent(ip)}/country/`,
            parse: async (response: Response) =>
                normalizeCountryCode(await response.text()),
        },
        {
            url: `https://ipwho.is/${encodeURIComponent(ip)}`,
            parse: async (response: Response) => {
                const data = (await response.json()) as {
                    success?: boolean;
                    country_code?: string;
                };

                if (data.success === false) {
                    return null;
                }

                return normalizeCountryCode(data.country_code);
            },
        },
    ];

    for (const provider of providers) {
        try {
            const response = await fetch(provider.url, {
                headers: {
                    Accept: "application/json, text/plain",
                },
                signal: AbortSignal.timeout(1500),
            });

            if (!response.ok) {
                continue;
            }

            const countryCode = await provider.parse(response);
            if (countryCode) {
                return countryCode;
            }
        } catch {
            continue;
        }
    }

    return null;
}

async function detectPreferredLanguage(req: Request) {
    const headerCountryCode = getCountryCodeFromHeaders(req);
    if (headerCountryCode) {
        return {
            language: mapCountryCodeToLanguage(headerCountryCode),
            countryCode: headerCountryCode,
            source: "header" as const,
        };
    }

    const clientIp = getClientIp(req);
    if (clientIp && !isPrivateIp(clientIp)) {
        const ipCountryCode = await lookupCountryCodeByIp(clientIp);
        if (ipCountryCode) {
            return {
                language: mapCountryCodeToLanguage(ipCountryCode),
                countryCode: ipCountryCode,
                source: "ip_lookup" as const,
            };
        }
    }

    return {
        language: detectLanguageFromAcceptLanguage(req),
        countryCode: null,
        source: req.headers["accept-language"]
            ? ("accept_language" as const)
            : ("default" as const),
    };
}

async function sendN8NWebhook(
    input: z.infer<typeof api.messages.create.input>,
) {
    const username = process.env.N8N_BASIC_USER!;
    const password = process.env.N8N_BASIC_PASS!;

    const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

    const webhookResponse = await fetch(process.env.N8N_WEBHOOK_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuth}`,
        },
        body: JSON.stringify({
            name: input.name,
            email: input.email,
            message: input.message,
            source: "portfolio-contact-form",
            timestamp: new Date().toISOString(),
        }),
    });

    return webhookResponse;
}
