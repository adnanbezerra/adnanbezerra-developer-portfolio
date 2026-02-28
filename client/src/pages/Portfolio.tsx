import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn } from "@/components/ui/FadeIn";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowRight,
    Code2,
    Database,
    Layout,
    Server,
    Terminal,
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Send,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";

// Schema for frontend form validation mapping to the backend requirement
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Portfolio() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const createMessage = useCreateMessage();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await createMessage.mutateAsync(data);
            toast({
                title: t.contact.success,
                className: "bg-green-900 border-green-800 text-white",
            });
            reset();
        } catch (error) {
            toast({
                title: t.contact.error,
                variant: "destructive",
            });
        }
    };

    const stackCategories = [
        {
            title: "Backend",
            icon: <Server className="w-5 h-5 text-primary" />,
            items: [
                "Node.js",
                "Express",
                "NestJS",
                "Fastify",
                "Spring Boot (Java)",
            ],
        },
        {
            title: "Frontend",
            icon: <Layout className="w-5 h-5 text-primary" />,
            items: [
                "React.js",
                "Next.js",
                "HTML/CSS",
                "JavaScript",
                "TypeScript",
            ],
        },
        {
            title: "Database",
            icon: <Database className="w-5 h-5 text-primary" />,
            items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
        },
        {
            title: "DevOps & Cloud",
            icon: <Terminal className="w-5 h-5 text-primary" />,
            items: ["AWS", "GCP", "Azure", "Git", "Docker"],
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            {/* Background Decorators */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
            </div>

            <main className="relative z-10">
                {/* HERO SECTION */}
                <section
                    id="home"
                    className="min-h-screen flex items-center pt-20 pb-12"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-3xl">
                            <FadeIn delay={0.1}>
                                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                    {t.hero.greeting}
                                </span>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <h1 className="text-5xl sm:text-7xl font-bold font-display text-white mb-4 leading-tight">
                                    Adnan Bezerra.
                                    <br />
                                    <span className="text-gradient">
                                        {t.hero.title}
                                    </span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <h2 className="text-xl sm:text-2xl text-muted-foreground font-medium mb-6">
                                    {t.hero.subtitle}
                                </h2>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <div className="flex flex-col gap-2 mb-10">
                                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                                        {t.hero.description}
                                    </p>
                                    <a
                                        href="mailto:adnanbezerra@proton.me"
                                        className="text-primary hover:underline font-mono flex items-center gap-2 w-fit"
                                    >
                                        <Mail size={18} />
                                        adnanbezerra@proton.me
                                    </a>
                                </div>
                            </FadeIn>

                            <FadeIn
                                delay={0.5}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <a
                                    href="#contact"
                                    className="px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                                >
                                    {t.hero.cta}
                                    <ArrowRight size={18} />
                                </a>
                                <a
                                    href="https://github.com/adnanbezerra"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-xl font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                                >
                                    <Github size={18} />
                                    {t.hero.resume}
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/adnanbezerra"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-xl font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                                >
                                    <Linkedin size={18} />
                                    LinkedIn
                                </a>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ABOUT SECTION */}
                <section
                    id="about"
                    className="py-24 bg-card/30 border-y border-white/5 backdrop-blur-sm"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn>
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
                                    {t.about.title}
                                </h2>
                                <div className="h-[1px] flex-1 bg-white/10"></div>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            <FadeIn
                                delay={0.2}
                                className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-lg"
                            >
                                <p>{t.about.p1}</p>
                                <p>{t.about.p2}</p>
                                <p>{t.about.p3}</p>

                                <div className="pt-6">
                                    <h3 className="text-white font-semibold text-xl mb-3 flex items-center gap-2">
                                        <Code2 className="text-primary w-5 h-5" />
                                        {t.about.philosophy}
                                    </h3>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary transition-all group-hover:w-2"></div>
                                        <p className="italic relative z-10 text-base">
                                            "{t.about.philosophyText}"
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn
                                delay={0.4}
                                direction="left"
                                className="lg:col-span-5 relative"
                            >
                                {/* Abstract avatar representation since no image provided */}
                                <div className="aspect-square rounded-3xl overflow-hidden glass-panel relative flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-indigo-500/20 group-hover:scale-110 transition-transform duration-700"></div>

                                    {/* Decorative code elements inside the "avatar" box */}
                                    <div className="absolute top-8 left-8 text-white/20 font-mono text-sm group-hover:text-primary/40 transition-colors">
                                        {"<FullStack />"}
                                    </div>
                                    <div className="absolute bottom-8 right-8 text-white/20 font-mono text-sm group-hover:text-primary/40 transition-colors">
                                        {"await build()"}
                                    </div>

                                    <div className="w-32 h-32 rounded-full border-2 border-primary/50 flex items-center justify-center relative shadow-[0_0_50px_rgba(var(--primary),0.3)]">
                                        <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-4xl font-display font-bold text-white">
                                            AB
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* STACK SECTION */}
                <section id="stack" className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn>
                            <div className="flex items-center gap-4 mb-4">
                                <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
                                    {t.stack.title}
                                </h2>
                                <div className="h-[1px] flex-1 bg-white/10"></div>
                            </div>
                            <p className="text-muted-foreground mb-12">
                                {t.stack.description}
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stackCategories.map((category, idx) => (
                                <FadeIn key={idx} delay={0.1 * idx}>
                                    <div className="p-6 rounded-2xl glass-panel hover-glow h-full">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                {category.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {category.title}
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {category.items.map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1.5 rounded-md text-sm bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-primary/50 transition-colors cursor-default"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section
                    id="projects"
                    className="py-24 bg-card/30 border-y border-white/5 backdrop-blur-sm"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn>
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
                                    {t.projects.title}
                                </h2>
                                <div className="h-[1px] flex-1 bg-white/10"></div>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {t.projects.items.map((project, idx) => (
                                <FadeIn key={idx} delay={0.1 * idx}>
                                    <div className="group rounded-2xl p-8 glass-panel hover-glow h-full flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 text-primary">
                                            <ExternalLink size={24} />
                                        </div>

                                        <span className="text-xs font-mono text-primary mb-4 tracking-wider uppercase">
                                            {project.role}
                                        </span>
                                        <h3 className="text-2xl font-bold font-display text-white mb-4 group-hover:text-primary transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn>
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
                                    {t.experience.title}
                                </h2>
                                <div className="h-[1px] flex-1 bg-white/10"></div>
                            </div>
                        </FadeIn>

                        <div className="max-w-4xl mx-auto relative">
                            {/* Timeline Line */}
                            <div className="absolute left-[20px] md:left-[50%] top-0 bottom-0 w-[2px] bg-white/10"></div>

                            {t.experience.items.map((item, idx) => (
                                <FadeIn
                                    key={idx}
                                    delay={0.1 * idx}
                                    className="mb-12 relative"
                                >
                                    <div
                                        className={`flex flex-col md:flex-row items-start ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[20px] md:left-[50%] w-4 h-4 rounded-full bg-primary -translate-x-[7px] md:-translate-x-[7px] mt-1.5 ring-4 ring-background z-10"></div>

                                        {/* Content Box */}
                                        <div
                                            className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}
                                        >
                                            <div className="glass-panel p-6 rounded-2xl hover-glow">
                                                <span className="text-sm font-mono text-primary mb-2 block">
                                                    {item.period}
                                                </span>
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {item.role}
                                                </h3>
                                                <h4 className="text-muted-foreground font-medium mb-4">
                                                    {item.company}
                                                </h4>
                                                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        {/* PUBLICATIONS (Appended to Experience roughly) */}
                        <FadeIn delay={0.4} className="mt-24">
                            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <span className="text-xs font-mono text-primary mb-2 block uppercase tracking-wider">
                                            {t.publications.title}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {t.publications.name}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {t.publications.desc}
                                        </p>
                                    </div>
                                    <a
                                        href="https://rsdjournal.org/index.php/rsd/article/view/40626"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 px-6 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all flex items-center gap-2 whitespace-nowrap"
                                    >
                                        {t.publications.linkText}
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section
                    id="contact"
                    className="py-24 bg-card/30 border-t border-white/5 backdrop-blur-sm"
                >
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                                    {t.contact.title}
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    {t.contact.description}
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="glass-panel p-8 md:p-10 rounded-3xl space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80">
                                            {t.contact.form.name}
                                        </label>
                                        <input
                                            {...register("name")}
                                            className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${errors.name ? "border-destructive" : "border-white/10 focus:border-primary"} text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <span className="text-xs text-destructive">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80">
                                            {t.contact.form.email}
                                        </label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${errors.email ? "border-destructive" : "border-white/10 focus:border-primary"} text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <span className="text-xs text-destructive">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">
                                        {t.contact.form.message}
                                    </label>
                                    <textarea
                                        {...register("message")}
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-xl bg-background/50 border ${errors.message ? "border-destructive" : "border-white/10 focus:border-primary"} text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none`}
                                        placeholder="Hello..."
                                    />
                                    {errors.message && (
                                        <span className="text-xs text-destructive">
                                            {errors.message.message}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                    {isSubmitting
                                        ? t.contact.form.sending
                                        : t.contact.form.submit}
                                </button>
                            </form>
                        </FadeIn>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
