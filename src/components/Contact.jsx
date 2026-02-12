import { Github, Mail, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-white">Vamos </span>
          <span className="text-green-400">Conversar?</span>
        </h2>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-400 mb-12 leading-relaxed">
            Estou sempre aberto a novos projetos e oportunidades. Entre em contato!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://github.com/gprsilva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gray-900 px-8 py-4 rounded-xl border border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-400 group"
            >
              <Github className="w-6 h-6 text-green-400 group-hover:text-green-300" />
              <span className="text-white font-semibold group-hover:text-green-300">GitHub</span>
            </a>
            
            <a
              href="https://linkedin.com/in/gprsilva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gray-900 px-8 py-4 rounded-xl border border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-400 group"
            >
              <Linkedin className="w-6 h-6 text-green-400 group-hover:text-green-300" />
              <span className="text-white font-semibold group-hover:text-green-300">LinkedIn</span>
            </a>
            
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=gprsilva2008@gmail.com&su=Contato%20Pelo%20Site&body=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20seu%20projeto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gray-900 px-8 py-4 rounded-xl border border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-400 group"
            >
              <Mail className="w-6 h-6 text-green-400 group-hover:text-green-300" />
              <span className="text-white font-semibold group-hover:text-green-300">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
