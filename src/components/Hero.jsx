import { Button } from '@/components/ui/button';
import TypewriterEffect from './TypewriterEffect';
import CodeBlock from './CodeBlock';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo - Texto */}
          <div className="space-y-6">
            <p className="text-green-400 text-lg font-medium">
              Olá, eu sou
            </p>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Guilherme</span>
              <br />
              <span className="text-white">Pereira</span>
            </h1>
            
            <div className="text-2xl md:text-3xl text-gray-300 font-medium">
              <TypewriterEffect 
                texts={[
                  "Desenvolvedor",
                  "Full Stack Developer", 
                  "Python Developer",
                  "Web Developer"
                ]}
                speed={100}
                deleteSpeed={50}
                pauseTime={2000}
              />
            </div>
            
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
              Desenvolvedor apaixonado por criar soluções web inovadoras e eficientes. 
              Especializado em Python, Django e tecnologias web modernas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Ver Projetos
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-8 py-4 border-2 border-green-500 text-green-400 hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden "
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contato
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
            
            {/* Ícones Sociais */}
            <div className="flex gap-4 pt-4">
              <a 
                href="https://github.com/gprsilva" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-300"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/guilherme-pereira-ruiz-da-silva-5ab5352bb/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:gprsilva2008@gmail.com?subject=Contato%20Pelo%20Site&body=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20seu%20projeto"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-300"
              >
                <Mail size={20} />
              </a>

            </div>
          </div>
          
          {/* Lado Direito - Bloco de Código */}
          <div className="flex justify-center lg:justify-end">
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
