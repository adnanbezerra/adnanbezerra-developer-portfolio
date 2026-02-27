import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-white/5 py-12 bg-background relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-bold font-display text-white">
            A<span className="text-primary">B</span>.
          </span>
          <p className="text-sm text-muted-foreground">
            {t.footer}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/adnanbezerra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:-translate-y-1"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/adnanbezerra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:-translate-y-1"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="mailto:adnanbezerra@proton.me" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:-translate-y-1"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
