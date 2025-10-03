import { Code, Globe, Database } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation();
  
  const skills = [
    { name: "Python", icon: "🐍", category: "Backend" },
    { name: "Django", icon: "🎸", category: "Backend" },
    { name: "JavaScript", icon: "⚡", category: "Frontend" },
    { name: "HTML5", icon: "🌐", category: "Frontend" },
    { name: "CSS3", icon: "🎨", category: "Frontend" },
    { name: "SQL", icon: "🗄️", category: "Database" },
    { name: "Git", icon: "📦", category: "Tools" },
    { name: "API REST", icon: "🔌", category: "Backend" }
  ];

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
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group text-center hover:border-green-400"
            >
              <div className="text-4xl mb-4">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {skill.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {skill.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
