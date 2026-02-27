import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.stack, href: "#stack" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="text-xl font-bold font-display text-white group">
          A<span className="text-primary group-hover:text-indigo-400 transition-colors">B</span>.
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setLanguage('pt')}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                language === 'pt' ? 'bg-primary text-white' : 'hover:bg-white/10 opacity-70'
              }`}
              title="Português"
            >
              🇧🇷
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                language === 'en' ? 'bg-primary text-white' : 'hover:bg-white/10 opacity-70'
              }`}
              title="English"
            >
              🇺🇸
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-white transition-colors block py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm text-muted-foreground">Language:</span>
                <button
                  onClick={() => { setLanguage('pt'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-all ${
                    language === 'pt' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  🇧🇷 PT
                </button>
                <button
                  onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded-md flex items-center gap-2 text-sm transition-all ${
                    language === 'en' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  🇺🇸 EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
