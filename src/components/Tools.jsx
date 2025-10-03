import { Trello, Github, Figma, GitBranch } from 'lucide-react';

const Tools = () => {
  const tools = [
    {
      name: "Trello",
      icon: <Trello className="w-8 h-8" />,
      description: "Gerenciamento de projetos"
    },
    {
      name: "Miro",
      icon: <GitBranch className="w-8 h-8" />,
      description: "Colaboração e brainstorming"
    },
    {
      name: "Figma",
      icon: <Figma className="w-8 h-8" />,
      description: "Design e prototipagem"
    },
    {
      name: "GitHub",
      icon: <Github className="w-8 h-8" />,
      description: "Controle de versão"
    }
  ];

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
              className="bg-gray-900 p-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-green-600 group min-w-[200px] text-center"
            >
              <div className="text-green-400 group-hover:text-white mb-4 flex justify-center">
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 text-sm">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
