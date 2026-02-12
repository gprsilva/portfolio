import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SkillModal from './SkillModal';
import useLocalStorage from '../hooks/useLocalStorage';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultSkills = [
    { 
      name: "Python", 
      icon: "🐍", 
      category: "Backend",
      proficiency: 90,
      description: "Python é uma linguagem de programação versátil e poderosa, ideal para desenvolvimento backend, análise de dados e automação.",
      experience: "3+ anos de experiência",
      applications: ["Django", "Flask", "Análise de Dados", "Automação"]
    },
    { 
      name: "Django", 
      icon: "🎸", 
      category: "Backend",
      proficiency: 85,
      description: "Django é um framework Python robusto para desenvolvimento web, com suporte a ORM, autenticação e admin panel.",
      experience: "2+ anos de experiência",
      applications: ["APIs REST", "Web Applications", "Multi-tenant Systems"]
    },
    { 
      name: "JavaScript", 
      icon: "⚡", 
      category: "Frontend",
      proficiency: 88,
      description: "JavaScript é a linguagem fundamental do desenvolvimento web frontend, permitindo interações dinâmicas e experiências ricas.",
      experience: "3+ anos de experiência",
      applications: ["React", "DOM Manipulation", "APIs", "Async Programming"]
    },
    { 
      name: "HTML5", 
      icon: "🌐", 
      category: "Frontend",
      proficiency: 92,
      description: "HTML5 é a linguagem de marcação moderna para estruturar conteúdo web, com suporte a semântica e elementos multimídia.",
      experience: "3+ anos de experiência",
      applications: ["Web Pages", "Semantic Markup", "Forms", "Media Embedding"]
    },
    { 
      name: "CSS3", 
      icon: "🎨", 
      category: "Frontend",
      proficiency: 90,
      description: "CSS3 é a tecnologia de estilização moderna para web, com suporte a flexbox, grid, animações e responsividade.",
      experience: "3+ anos de experiência",
      applications: ["Responsive Design", "Animations", "Flexbox", "Grid Layouts"]
    },
    { 
      name: "SQL", 
      icon: "🗄️", 
      category: "Database",
      proficiency: 85,
      description: "SQL é a linguagem padrão para gerenciamento de bancos de dados relacionais, essencial para aplicações modernas.",
      experience: "2+ anos de experiência",
      applications: ["Queries", "Database Design", "Optimization", "PostgreSQL"]
    },
    { 
      name: "Git", 
      icon: "📦", 
      category: "Tools",
      proficiency: 88,
      description: "Git é o sistema de controle de versão mais popular, fundamental para trabalho em equipe e gestão de código.",
      experience: "3+ anos de experiência",
      applications: ["Version Control", "Branching", "Collaboration", "GitHub"]
    },
    { 
      name: "API REST", 
      icon: "🔌", 
      category: "Backend",
      proficiency: 87,
      description: "APIs REST são interfaces para comunicação entre sistemas, seguindo princípios de arquitetura web moderna.",
      experience: "2+ anos de experiência",
      applications: ["Backend Development", "Integration", "Data Exchange", "Microservices"]
    }
  ];

  const [skills, setSkills] = useLocalStorage('portfolio_skills', defaultSkills);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-white">Minhas </span>
          <span className="text-green-400">Habilidades</span>
        </h2>
        
        <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {skills.map((skill, index) => (
            <div
              key={index}
              onClick={() => handleSkillClick(skill)}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group text-center hover:border-green-400 cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                {skill.name}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {skill.category}
              </p>
              {skill.proficiency && (
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skill Modal */}
      <SkillModal 
        skill={selectedSkill} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Skills;
