import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, MessageCircle, Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary)] dark:bg-[var(--color-dark)] text-[var(--color-paralel)] dark:text-[var(--color-text)]">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-8 w-8 text-[var(--color-accent)]" />
              <h3 className="text-2xl font-semibold font-poppins ">FH Resolve</h3>
            </div>
            <p className="text-[var(--color-light)]/70 dark:text-opacity-70 mb-6 leading-relaxed">
              Serviços de manutenção residencial com qualidade e confiança em Florianópolis e região.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="h-6 w-6" />, label: 'Instagram' },
                { icon: <Facebook className="h-6 w-6" />, label: 'Facebook' },
                { icon: <Linkedin className="h-6 w-6" />, label: 'LinkedIn' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, color: 'var(--color-accent)' }}
                  className="h-12 w-12 rounded-full bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 ">Links Rápidos</h3>
            <ul className="space-y-3">
              {['Início', 'Sobre', 'Serviços', 'Portfólio', 'Depoimentos', 'Contato'].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase() === 'início' ? 'hero' : item.toLowerCase()}`}
                    className="text-[var(--color-light)]/70 dark:text-opacity-70 hover:text-[var(--color-accent)] transition-colors flex items-center gap-2"
                  >
                    <span className="h-1 w-1 bg-[var(--color-accent)] rounded-full"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 ">Serviços</h3>
            <ul className="space-y-3">
              {['Reparos Elétricos', 'Serviços Hidráulicos', 'Montagem de Móveis', 'Instalações', 'Pequenos Reparos', 'Manutenção Geral'].map((item, index) => (
                <li key={index}>
                  <a
                    href="#benefits"
                    className="text-[var(--color-light)]/70 dark:text-opacity-70 hover:text-[var(--color-accent)] transition-colors flex items-center gap-2"
                  >
                    <span className="h-1 w-1 bg-[var(--color-accent)] rounded-full"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-6 ">Contato</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+5548991919791" className="flex items-start gap-3 text-[var(--color-light)]/70 dark:text-opacity-70 hover:text-[var(--color-light)] transition-colors">
                  <Phone className="h-5 w-5 mt-1 text-[var(--color-accent)]" />
                  <span>+55 48 99191-9791</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5548991919791"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[var(--color-light)]/70 dark:text-opacity-70 hover:text-[var(--color-light)] transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mt-1 text-[var(--color-accent)]" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="mailto:contato@fhresolve.com.br" className="flex items-start gap-3 text-[var(--color-light)]/70 dark:text-opacity-70 hover:text-[var(--color-light)] transition-colors">
                  <Mail className="h-5 w-5 mt-1 text-[var(--color-accent)]" />
                  <span>contato@fhresolve.com.br</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[var(--color-light)]/70 dark:text-opacity-70">
                  <MapPin className="h-5 w-5 mt-1 text-[var(--color-accent)]" />
                  <span>Ratones, Florianópolis - SC</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--color-light)]/70 dark:text-opacity-70 text-sm">
            © {currentYear} FH Resolve - Criado por Fernando, seu especialista em manutenção.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.4 }}
            className="mt-4 md:mt-0 h-12 w-12 rounded-full bg-[var(--color-accent)] text-[var(--color-dark)] dark:text-[var(--color-primary)] flex items-center justify-center hover:brightness-110 shadow-md"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;