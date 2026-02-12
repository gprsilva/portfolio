import { useState } from 'react';
import { Trello, Github, Figma, GitBranch } from 'lucide-react';
import ToolModal from './ToolModal';
import useLocalStorage from '../hooks/useLocalStorage';

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultTools = [
    {
      name: "Trello",
      icon: <Trello className="w-8 h-8" />,
      description: "Gerenciamento de projetos",
      fullDescription: "Trello é uma ferramenta visual de gerenciamento de projetos baseada em quadros Kanban. Permite organizar tarefas em colunas e acompanhar o progresso de forma intuitiva.",
      features: [
        "Quadros Kanban customizáveis",
        "Cartões com checklists",
        "Automações com Power-Ups",
        "Colaboração em tempo real"
      ],
      useCases: [
        "Gerenciamento de sprints",
        "Organização de tarefas",
        "Planejamento de projetos",
        "Acompanhamento de workflows"
      ],
      website: "https://trello.com"
    },
    {
      name: "Miro",
      icon: <GitBranch className="w-8 h-8" />,
      description: "Colaboração e brainstorming",
      fullDescription: "Miro é uma plataforma digital de colaboração que permite equipes trabalhar juntas em tempo real, criando diagramas, wireframes e ideias em um espaço visual infinito.",
      features: [
        "Quadro branco infinito",
        "Templates prontos",
        "Colaboração em tempo real",
        "Integração com ferramentas populares"
      ],
      useCases: [
        "Brainstorming de ideias",
        "Diagramas e fluxogramas",
        "Planejamento de design",
        "Workshops remotos"
      ],
      website: "https://miro.com"
    },
    {
      name: "Figma",
      icon: <Figma className="w-8 h-8" />,
      description: "Design e prototipagem",
      fullDescription: "Figma é uma ferramenta de design colaborativa baseada em nuvem, permitindo criar interfaces, protótipos e designs responsivos com facilidade.",
      features: [
        "Design colaborativo em tempo real",
        "Componentes reutilizáveis",
        "Prototipagem interativa",
        "Handoff para desenvolvedores"
      ],
      useCases: [
        "Design de interfaces",
        "Prototipagem de aplicações",
        "Design systems",
        "Colaboração entre designers"
      ],
      website: "https://figma.com"
    },
    {
      name: "GitHub",
      icon: <Github className="w-8 h-8" />,
      description: "Controle de versão",
      fullDescription: "GitHub é a plataforma líder para hospedagem de repositórios Git, facilitando controle de versão, colaboração e integração contínua em projetos de software.",
      features: [
        "Repositórios públicos e privados",
        "Pull requests e code review",
        "GitHub Actions para CI/CD",
        "Integração com ferramentas de desenvolvimento"
      ],
      useCases: [
        "Controle de versão",
        "Colaboração em equipe",
        "Hospedagem de projetos",
        "Automação de workflows"
      ],
      website: "https://github.com"
    }
  ];

  const [tools, setTools] = useLocalStorage('portfolio_tools', defaultTools);

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  return (
    <section id="tools" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-white">Minhas </span>
          <span className="text-green-400">Ferramentas</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolClick(tool)}
              className="bg-gray-900 p-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-green-600 group min-w-[200px] text-center cursor-pointer border border-gray-700 hover:border-green-500"
            >
              <div className="text-green-400 group-hover:text-white mb-4 flex justify-center transition-colors">
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 text-sm">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Modal */}
      <ToolModal 
        tool={selectedTool} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Tools;
