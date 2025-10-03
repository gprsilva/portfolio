import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  const projects = [
    {
      title: "superbook",
      description: "Um superbook para super Pessoas.",
      tech: ["Python", "Django"],
      category: "Backend",
      github: "https://github.com/gprsilva/superbook",
      updated: "Set 2025"
    },
    {
      title: "Nexus",
      description: "Um site de noticias sobre o mundo da tecnologia.",
      tech: ["HTML", "CSS", "JavaScript"],
      category: "Frontend",
      github: "https://github.com/gprsilva/Nexus",
      updated: "Ago 2025"
    },
    {
      title: "django-pro",
      description: "Projeto para mostrar os passos de um deploy com django.",
      tech: ["Python", "Django", "Deploy"],
      category: "Backend",
      github: "https://github.com/gprsilva/django-pro",
      updated: "Ago 2025"
    },
    {
      title: "SistemaDeTurmas",
      description: "Um sistema de turmas para professores.",
      tech: ["JavaScript", "HTML", "CSS"],
      category: "Frontend",
      github: "https://github.com/gprsilva/SistemaDeTurmas",
      updated: "Ago 2025"
    },
    {
      title: "Consumo_API",
      description: "Exercicio: Consumo de API com venv, .env e GitHub.",
      tech: ["Python", "API"],
      category: "Backend",
      github: "https://github.com/gprsilva/Consumo_API",
      updated: "Ago 2025"
    },
    {
      title: "AstroScope",
      description: "Projeto desenvolvido em Python.",
      tech: ["Python"],
      category: "Data",
      github: "https://github.com/gprsilva/AstroScope",
      updated: "Mai 2025"
    },
    {
      title: "Urna Eletrônica",
      description: "Simulação de urna eletrônica com Jupyter Notebook.",
      tech: ["Python", "Jupyter"],
      category: "Data",
      github: "https://github.com/gprsilva/urna-eletronica",
      updated: "Mai 2025"
    }
  ];

  const filters = [
    { name: 'Todos', color: 'bg-green-600 hover:bg-green-700', count: projects.length },
    { name: 'Frontend', color: 'bg-pink-600 hover:bg-pink-700', count: projects.filter(p => p.category === 'Frontend').length },
    { name: 'Backend', color: 'bg-blue-600 hover:bg-blue-700', count: projects.filter(p => p.category === 'Backend').length },
    { name: 'Data', color: 'bg-purple-600 hover:bg-purple-700', count: projects.filter(p => p.category === 'Data').length }
  ];

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-white">Meus </span>
          <span className="text-green-400">Projetos</span>
        </h2>
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 border ${
                activeFilter === filter.name
                  ? 'bg-green-600 text-white border-green-600 shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white hover:border-gray-600'
              }`}
            >
              {filter.name}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter.name 
                  ? 'bg-white/20' 
                  : 'bg-gray-700'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-700 hover:border-green-400"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    Atualizado em {project.updated}
                  </span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
