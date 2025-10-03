import { useScrollAnimation } from '../hooks/useScrollAnimation';

import { Code, Database, Globe } from 'lucide-react';

const About = () => {
  const aboutCards = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Desenvolvimento",
      description: "Experiência em desenvolvimento web full stack com foco em Python, Django e tecnologias modernas."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Banco de Dados",
      description: "Conhecimento sólido em SQL Server, modelagem de dados e otimização de consultas."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Design",
      description: "Criação de interfaces responsivas e modernas com HTML, CSS e JavaScript."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-white">Sobre </span>
          <span className="text-green-400">Mim</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-xl border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group hover:border-green-400"
            >
              <div className="text-green-400 mb-6 group-hover:text-green-300 transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {card.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
