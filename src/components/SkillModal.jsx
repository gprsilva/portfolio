import { X } from 'lucide-react';
import { useEffect } from 'react';

const SkillModal = ({ skill, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !skill) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{skill.icon}</span>
              <h2 className="text-2xl font-bold text-white">{skill.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Categoria */}
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">Categoria</h3>
              <p className="text-gray-300">{skill.category}</p>
            </div>

            {/* Descrição */}
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">O que é</h3>
              <p className="text-gray-300 leading-relaxed">
                {skill.description || `${skill.name} é uma habilidade fundamental no desenvolvimento de software moderno.`}
              </p>
            </div>

            {/* Proficiência */}
            {skill.proficiency && (
              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-2">Nível de Proficiência</h3>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">{skill.proficiency}%</p>
              </div>
            )}

            {/* Experiência */}
            {skill.experience && (
              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-2">Experiência</h3>
                <p className="text-gray-300">{skill.experience}</p>
              </div>
            )}

            {/* Aplicações */}
            {skill.applications && skill.applications.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-2">Aplicações</h3>
                <ul className="space-y-1">
                  {skill.applications.map((app, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-green-400">•</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillModal;
