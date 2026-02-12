import { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { useActiveSection } from '../hooks/useScrollAnimation';

const Navbar = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    closeMenu();
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-700 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 text-xl font-bold text-green-400 font-mono">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-terminal w-6 h-6 text-emerald-400" aria-hidden="true"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
            <span class="text-xl font-bold font-mono">gprsilva</span>
          </div>
          
          <ul className="hidden md:flex space-x-8 items-center">
            {[
              { id: 'about', label: 'Sobre' },
              { id: 'skills', label: 'Habilidades' },
              { id: 'tools', label: 'Ferramentas' },
              { id: 'projects', label: 'Projetos' },
              { id: 'contact', label: 'Contato' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-all duration-300 relative group ${
                    activeSection === item.id 
                      ? 'text-green-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-green-400 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-green-400 rounded-lg transition-all duration-300 border border-gray-700 hover:border-green-400"
                title="Painel Administrativo"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Admin</span>
              </button>
            </li>
          </ul>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onAdminClick}
              className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-green-400 rounded-lg transition-all duration-300 border border-gray-700 hover:border-green-400"
              title="Painel Administrativo"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-green-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <ul className="py-4 space-y-2">
            {['home', 'about', 'skills', 'tools', 'projects', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-800 rounded transition-colors duration-300"
                >
                  {item === 'home' ? 'Início' : 
                   item === 'about' ? 'Sobre' :
                   item === 'skills' ? 'Habilidades' :
                   item === 'tools' ? 'Ferramentas' :
                   item === 'projects' ? 'Projetos' : 'Contato'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
