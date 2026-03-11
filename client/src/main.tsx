import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {
    applyDocumentLanguage,
    detectLanguageFromBrowser,
    detectLanguageFromLocation,
    getStoredLanguageOverride,
} from "@/lib/language";

async function bootstrap() {
    const initialLanguage =
        getStoredLanguageOverride() ??
        (await detectLanguageFromLocation()) ??
        detectLanguageFromBrowser();

    applyDocumentLanguage(initialLanguage);

    createRoot(document.getElementById("root")!).render(
        <App initialLanguage={initialLanguage} />,
    );
}

bootstrap();
