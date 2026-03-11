import { api, type LocaleDetectResponse } from "@shared/routes";
import type { Language } from "@/lib/translations";

export const LANGUAGE_OVERRIDE_STORAGE_KEY = "portfolio-language-override";

export function getStoredLanguageOverride(): Language | null {
    if (typeof window === "undefined") {
        return null;
    }

    const storedLanguage = window.localStorage.getItem(
        LANGUAGE_OVERRIDE_STORAGE_KEY,
    );
    return storedLanguage === "pt" || storedLanguage === "en"
        ? storedLanguage
        : null;
}

export function applyDocumentLanguage(language: Language) {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.lang = language;
}

export function persistLanguageOverride(language: Language) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(LANGUAGE_OVERRIDE_STORAGE_KEY, language);
    applyDocumentLanguage(language);
}

export function detectLanguageFromBrowser(): Language {
    return "pt";
}

export async function detectLanguageFromLocation(): Promise<Language> {
    try {
        const response = await fetch(api.locale.detect.path, {
            method: api.locale.detect.method,
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Locale detection failed with ${response.status}`);
        }

        const data = (await response.json()) as LocaleDetectResponse;
        return data.language;
    } catch {
        return detectLanguageFromBrowser();
    }
}
