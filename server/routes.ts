import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
    httpServer: Server,
    app: Express,
): Promise<Server> {
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
