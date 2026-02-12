import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const defaultProjects = [
  {
    title: "superbook",
    description: "Um superbook para super Pessoas.",
    fullDescription: "Superbook é uma aplicação desenvolvida em Django que permite o gerenciamento e compartilhamento de informações de forma inovadora. O projeto demonstra as melhores práticas de desenvolvimento backend com Python e Django.",
    tech: ["Python", "Django"],
    category: "Backend",
    github: "https://github.com/gprsilva/superbook",
    updated: "Set 2025",
    features: ["Gerenciamento de dados", "Interface intuitiva", "Segurança robusta"]
  },
  {
    title: "Nexus",
    description: "Um site de noticias sobre o mundo da tecnologia.",
    fullDescription: "Nexus é um portal de notícias focado em tecnologia, desenvolvido com HTML, CSS e JavaScript puro. Oferece uma experiência responsiva e moderna para leitura de notícias sobre o universo tech.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    github: "https://github.com/gprsilva/Nexus",
    updated: "Ago 2025",
    features: ["Design responsivo", "Notícias em tempo real", "Interface limpa"]
  },
  {
    title: "django-pro",
    description: "Projeto para mostrar os passos de um deploy com django.",
    fullDescription: "Django-Pro é um projeto educacional que demonstra passo a passo como fazer o deploy de uma aplicação Django em produção. Inclui boas práticas de segurança e configuração.",
    tech: ["Python", "Django", "Deploy"],
    category: "Backend",
    github: "https://github.com/gprsilva/django-pro",
    updated: "Ago 2025",
    features: ["Guia de deploy", "Configuração de servidor", "Segurança em produção"]
  },
  {
    title: "SistemaDeTurmas",
    description: "Um sistema de turmas para professores.",
    fullDescription: "Sistema de Turmas é uma aplicação web que permite professores gerenciar suas turmas, alunos e atividades de forma eficiente. Desenvolvido com tecnologias frontend modernas.",
    tech: ["JavaScript", "HTML", "CSS"],
    category: "Frontend",
    github: "https://github.com/gprsilva/SistemaDeTurmas",
    updated: "Ago 2025",
    features: ["Gestão de turmas", "Controle de alunos", "Relatórios"]
  },
  {
    title: "Consumo_API",
    description: "Exercicio: Consumo de API com venv, .env e GitHub.",
    fullDescription: "Projeto educacional que demonstra como consumir APIs externas em Python, utilizando boas práticas como variáveis de ambiente e ambientes virtuais.",
    tech: ["Python", "API"],
    category: "Backend",
    github: "https://github.com/gprsilva/Consumo_API",
    updated: "Ago 2025",
    features: ["Consumo de APIs", "Variáveis de ambiente", "Boas práticas"]
  },
  {
    title: "AstroScope",
    description: "Projeto desenvolvido em Python.",
    fullDescription: "AstroScope é um projeto Python que trabalha com análise de dados astronômicos. Demonstra o uso de bibliotecas científicas e análise de dados com Python.",
    tech: ["Python"],
    category: "Data",
    github: "https://github.com/gprsilva/AstroScope",
    updated: "Mai 2025",
    features: ["Análise de dados", "Visualizações", "Cálculos astronômicos"]
  },
  {
    title: "Urna Eletrônica",
    description: "Simulação de urna eletrônica com Jupyter Notebook.",
    fullDescription: "Simulação de Urna Eletrônica é um projeto educacional que implementa a lógica de uma urna eletrônica usando Python em Jupyter Notebook, com interface interativa.",
    tech: ["Python", "Jupyter"],
    category: "Data",
    github: "https://github.com/gprsilva/urna-eletronica",
    updated: "Mai 2025",
    features: ["Simulação de votação", "Interface interativa", "Análise de resultados"]
  },
  {
    title: "MySphere",
    description: "Rede social profissional multi-tenant com Django.",
    fullDescription: "MySphere é uma plataforma inovadora de rede social profissional desenvolvida com Django, oferecendo funcionalidades avançadas como feed em tempo real, chat, gamificação e sistema de eventos. A arquitetura multi-tenant permite que cada empresa tenha seu próprio ambiente isolado.",
    tech: ["Python", "Django", "PostgreSQL", "JavaScript", "HTML", "CSS"],
    category: "Full-Stack",
    github: "https://github.com/SENAI-Morvan-Figueiredo/MySphere",
    updated: "Fev 2026",
    features: [
      "Feed com postagens em tempo real",
      "Chat com comunicação instantânea",
      "Sistema de gamificação com pontuação e rankings",
      "Gerenciamento de eventos",
      "Sistema de conquistas e badges",
      "Arquitetura multi-tenant segura"
    ]
  },
  {
    title: "SoulRedemptionPygames",
    description: "Jogo 2D com narrativa emocional e pixel art.",
    fullDescription: "Soul Redemption é um jogo 2D imersivo desenvolvido em Pygame que leva o jogador através de uma jornada emocional em 3 fases temáticas: Medo, Raiva e Culpa. Com visual em pixel art e narrativa profunda, o jogo oferece uma experiência única e memorável.",
    tech: ["Python", "Pygame", "Tiled", "Pixilart", "Figma"],
    category: "Game Development",
    github: "https://github.com/Dronato/SoulRedemptionPygames",
    updated: "Fev 2026",
    features: [
      "3 fases com temáticas emocionais distintas",
      "Mundos dinâmicos e exploração",
      "Sistema de combate desafiador",
      "Coleta de fragmentos de memória",
      "Sistema de habilidades dinâmico",
      "Visual em pixel art nostálgico",
      "Cutscenes e trilha sonora imersiva"
    ]
  },
  {
    title: "WMS",
    description: "Sistema de Warehouse Management para controle de estoque.",
    fullDescription: "WMS (Warehouse Management System) é um sistema robusto desenvolvido com Node.js e SQL Server para gerenciamento completo de operações de armazém. Oferece controle de estoque, gestão financeira e relatórios detalhados.",
    tech: ["Node.js", "SQL Server", "JavaScript", "HTML", "CSS"],
    category: "Backend",
    github: "https://github.com/Dronato/WMS",
    updated: "Fev 2026",
    features: [
      "Cadastro e gerenciamento de produtos",
      "Edição e exclusão com segurança",
      "Controle completo de estoque",
      "Módulo financeiro (entradas e saídas)",
      "Visualização de saldos e relatórios",
      "Autenticação e controle de acesso",
      "Interface intuitiva e responsiva"
    ]
  }
];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Inicializa com os projetos padrão se o localStorage estiver vazio
  const [projects, setProjects] = useLocalStorage('portfolio_projects', defaultProjects);
  const [skills, setSkills] = useLocalStorage('portfolio_skills', []);
  const [tools, setTools] = useLocalStorage('portfolio_tools', []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Navbar onAdminClick={() => setIsAdminOpen(true)} />
      <Hero />
      <About />
      <Skills />
      <Tools />
      <Projects projects={projects} />
      <Contact />
      <Footer />
      
      {/* Admin Panel */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)}
        projects={projects}
        setProjects={setProjects}
        skills={skills}
        setSkills={setSkills}
        tools={tools}
        setTools={setTools}
      />
    </div>
  );
}

export default App;
