import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { Language, translations } from "@/lib/translations";
import {
    applyDocumentLanguage,
    persistLanguageOverride,
} from "@/lib/language";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.en;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
);

export function LanguageProvider({
    children,
    initialLanguage,
}: {
    children: ReactNode;
    initialLanguage: Language;
}) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);

    useEffect(() => {
        applyDocumentLanguage(language);
    }, [language]);

    const value = {
        language,
        setLanguage: (lang: Language) => {
            setLanguageState(lang);
            persistLanguageOverride(lang);
        },
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
