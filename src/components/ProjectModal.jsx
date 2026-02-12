import { X } from 'lucide-react';
import { useEffect } from 'react';

const ProjectModal = ({ project, isOpen, onClose }) => {
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

  if (!isOpen || !project) return null;

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
          className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Descrição</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Funcionalidades */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Funcionalidades</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tecnologias */}
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full text-sm font-medium border border-gray-600 hover:border-green-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Categoria */}
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Categoria</h3>
              <p className="text-gray-300">{project.category}</p>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4 border-t border-gray-700">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors text-center"
              >
                Ver no GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors text-center"
                >
                  Ver Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
