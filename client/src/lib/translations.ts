export type Language = "en" | "pt";

export const translations = {
    en: {
        nav: {
            about: "About",
            stack: "Stack",
            projects: "Projects",
            experience: "Experience",
            contact: "Contact",
        },
        hero: {
            greeting: "Hello, I am",
            title: "Software Engineer",
            subtitle: "Full Stack Developer | Automation & AI",
            description:
                "Crafting scalable web systems and process automation with clean architecture and strategic use of AI.",
            cta: "Get in touch",
            resume: "View GitHub",
        },
        about: {
            title: "About Me",
            p1: "Software engineer with full stack expertise in scalable web systems and process automation. I have solid experience with Node.js, NestJS, Next.js, and relational/non-relational databases.",
            p2: "My focus is on building performant and secure backends while developing responsive and user-experience oriented interfaces. I thrive in agile environments and multidisciplinary team collaboration.",
            p3: "I prioritize clean architecture, operational efficiency, and continuous improvement, with practical experience deploying on AWS, OCN, and GCP.",
            philosophy: "Philosophy",
            philosophyText:
                "Software development should solve real-life problems. Often we have difficulty seeing how technological innovation translates into the lives of non-technical people; and what I find most valuable is using technology to make their lives easier.",
        },
        stack: {
            title: "Tech Stack",
            description:
                "Technologies I work with on a daily basis to build robust solutions.",
        },
        projects: {
            title: "Guided Projects",
            items: [
                {
                    name: "Calendo",
                    role: "Tech Lead",
                    desc: "SaaS for scheduling with a local focus. Coordinated the team, structured the database, and developed the backend.",
                    tech: ["Node.js", "Fastify", "PostgreSQL", "React"],
                },
                {
                    name: "Produtos Guadalupe",
                    role: "Full Stack",
                    desc: "E-commerce for artisanal products. Developed the website, automation for orders, and seamless checkout experience.",
                    tech: ["Next.js", "TypeScript", "Tailwind"],
                },
                {
                    name: "LavôEu",
                    role: "Full Stack",
                    desc: "Laundry franchise in SP. Built system with customer and admin areas, totem support, and physical machine coordination.",
                    tech: ["React", "ExpressJS", "PostgreSQL"],
                },
            ],
        },
        experience: {
            title: "Experience",
            items: [
                {
                    role: "Full Stack Developer",
                    company: "Curseduca",
                    period: "Nov 2023 - Feb 2026",
                    desc: "Led migration and automation team. Achieved +150 successful migrations. Built webcrawlers, APIs, and maintained microservices architecture.",
                },
                {
                    role: "IT Commercial Writer",
                    company: "Chudovo",
                    period: "Nov 2024 - Present",
                    desc: "Authored approximately 30 technical SEO articles in English focusing on software development trends and practices.",
                },
                {
                    role: "IT Assistant",
                    company: "Prefeitura de Campina Grande",
                    period: "Aug 2022 - Oct 2023",
                    desc: "Maintained IT infrastructure and managed ProxMox servers for municipal operations.",
                },
                {
                    role: "Full Stack Developer",
                    company: "Driven Education",
                    period: "Mar 2022 - Dec 2022",
                    desc: "Developed and delivered over 30 full stack projects utilizing modern web technologies.",
                },
            ],
        },
        publications: {
            title: "Publications",
            name: "International publication in Research, Society and Development",
            desc: "PIBIC/CNPq context on disruptive technologies.",
            linkText: "Read Publication",
        },
        contact: {
            title: "Get In Touch",
            description:
                "Available for remote opportunities, on-demand projects, and technical collaborations.",
            form: {
                name: "Name",
                email: "Email",
                message: "Message",
                submit: "Send Message",
                sending: "Sending...",
            },
            success: "Message sent successfully!",
            error: "Failed to send message. Please try again.",
        },
        footer: "Built with React & Tailwind CSS. All rights reserved.",
    },
    pt: {
        nav: {
            about: "Sobre",
            stack: "Tecnologias",
            projects: "Projetos",
            experience: "Experiência",
            contact: "Contato",
        },
        hero: {
            greeting: "Olá, eu sou",
            title: "Engenheiro de Software",
            subtitle: "Desenvolvedor Full Stack | Automação e IA",
            description:
                "Criando sistemas web escaláveis e automação de processos com arquitetura limpa e uso estratégico de IA.",
            cta: "Entrar em contato",
            resume: "Ver GitHub",
        },
        about: {
            title: "Sobre Mim",
            p1: "Engenheiro de software com experiência full stack em sistemas web escaláveis e automação de processos. Sólida experiência com Node.js, NestJS, Next.js e bancos de dados relacionais/não relacionais.",
            p2: "Meu foco é construir backends performáticos e seguros, enquanto desenvolvo interfaces responsivas e orientadas à experiência do usuário. Tenho vivência em ambientes ágeis e colaboração em equipes multidisciplinares.",
            p3: "Priorizo a arquitetura limpa, eficiência operacional e melhoria contínua, com experiência prática em deploy na AWS, OCN e GCP.",
            philosophy: "Filosofia",
            philosophyText:
                "O desenvolvimento de software deve resolver problemas da vida real. Muitas vezes temos dificuldade em ver como a inovação tecnológica se traduz na vida de pessoas não técnicas; e o que acho mais valioso é usar a tecnologia para facilitar a vida delas.",
        },
        stack: {
            title: "Tecnologias",
            description:
                "Ferramentas que utilizo diariamente para construir soluções robustas.",
        },
        projects: {
            title: "Projetos Guiados",
            items: [
                {
                    name: "Calendo",
                    role: "Tech Lead",
                    desc: "SaaS para agendamentos com foco local. Coordenei a equipe, estruturei o banco de dados e desenvolvi o backend.",
                    tech: ["Node.js", "Fastify", "PostgreSQL", "React"],
                },
                {
                    name: "Produtos Guadalupe",
                    role: "Full Stack",
                    desc: "E-commerce para produtos artesanais. Desenvolvi o site, automação de pedidos e experiência de checkout.",
                    tech: ["Next.js", "TypeScript", "Tailwind"],
                },
                {
                    name: "LavôEu",
                    role: "Full Stack",
                    desc: "Franquia de lavanderias em SP. Sistema com área de cliente e admin, suporte a totens e coordenação de máquinas físicas.",
                    tech: ["React", "ExpressJS", "PostgreSQL"],
                },
            ],
        },
        experience: {
            title: "Experiência",
            items: [
                {
                    role: "Desenvolvedor Full Stack",
                    company: "Curseduca",
                    period: "Nov 2023 - Fev 2026",
                    desc: "Liderei a equipe de migração e automação. +150 migrações de sucesso. Construção de webcrawlers, APIs e manutenção de arquitetura de microsserviços.",
                },
                {
                    role: "Redator Comercial de TI",
                    company: "Chudovo",
                    period: "Nov 2024 - Presente",
                    desc: "Autor de cerca de 30 artigos técnicos de SEO em inglês com foco em tendências e práticas de desenvolvimento de software.",
                },
                {
                    role: "Assistente de TI",
                    company: "Prefeitura de Campina Grande",
                    period: "Ago 2022 - Out 2023",
                    desc: "Manutenção de infraestrutura de TI e gerenciamento de servidores ProxMox para operações municipais.",
                },
                {
                    role: "Desenvolvedor Full Stack",
                    company: "Driven Education",
                    period: "Mar 2022 - Dez 2022",
                    desc: "Desenvolvimento e entrega de mais de 30 projetos full stack utilizando tecnologias web modernas.",
                },
            ],
        },
        publications: {
            title: "Publicações",
            name: "Publicação internacional na Research, Society and Development",
            desc: "Contexto PIBIC/CNPq sobre tecnologias disruptivas.",
            linkText: "Ler Publicação",
        },
        contact: {
            title: "Entre em Contato",
            description:
                "Disponível para oportunidades remotas, projetos sob demanda e colaborações técnicas.",
            form: {
                name: "Nome",
                email: "E-mail",
                message: "Mensagem",
                submit: "Enviar Mensagem",
                sending: "Enviando...",
            },
            success: "Mensagem enviada com sucesso!",
            error: "Falha ao enviar mensagem. Tente novamente.",
        },
        footer: "Desenvolvido com React & Tailwind CSS. Todos os direitos reservados.",
    },
};
