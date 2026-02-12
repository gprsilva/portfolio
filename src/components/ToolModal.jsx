import { X } from 'lucide-react';
import { useEffect } from 'react';

const ToolModal = ({ tool, isOpen, onClose }) => {
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

  if (!isOpen || !tool) return null;

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
              <div className="text-green-400">{tool.icon}</div>
              <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
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
            {/* Descrição */}
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">O que é</h3>
              <p className="text-gray-300 leading-relaxed">
                {tool.fullDescription || tool.description}
              </p>
            </div>

            {/* Funcionalidades */}
            {tool.features && tool.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-2">Principais Funcionalidades</h3>
                <ul className="space-y-1">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Casos de Uso */}
            {tool.useCases && tool.useCases.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-green-400 mb-2">Casos de Uso</h3>
                <ul className="space-y-1">
                  {tool.useCases.map((useCase, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-green-400">•</span>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Website */}
            {tool.website && (
              <div className="pt-4 border-t border-gray-700">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors text-center block"
                >
                  Visitar Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolModal;
