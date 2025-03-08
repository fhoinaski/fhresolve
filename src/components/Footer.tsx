import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, MessageCircle, Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentYear = new Date().getFullYear();

  const linkVariants = {
    hover: { x: 5, color: 'var(--color-accent)', transition: { duration: 0.3 } },
  };

  return (
    <footer className="bg-[var(--color-primary)] dark:bg-[var(--color-dark)] text-[var(--color-paralel)] relative">
      <motion.div
        className="absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />
      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-8 w-8 text-[var(--color-accent)]" />
              <h3 className="text-2xl font-semibold">FH Resolve</h3>
            </div>
            <p className="text-[var(--color-light)]/70 mb-6">
              Serviços de manutenção residencial em Florianópolis.
            </p>
            <div className="flex gap-4">
              {[<Instagram />, <Facebook />, <Linkedin />].map((icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="h-12 w-12 rounded-full bg-[var(--color-neutral)]/20 flex items-center justify-center"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {['Início', 'Sobre', 'Serviços', 'Contato'].map((item) => (
                <motion.li key={item} whileHover="hover" variants={linkVariants}>
                  <a href={`#${item.toLowerCase()}`} className="flex items-center gap-2">
                    <span className="h-1 w-1 bg-[var(--color-accent)] rounded-full"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-xl font-semibold mb-6">Contato</h3>
            <ul className="space-y-4">
              {[
                { icon: <Phone />, value: '+55 48 99191-9791', link: 'tel:+5548991919791' },
                { icon: <MessageCircle />, value: 'WhatsApp', link: 'https://wa.me/5548991919791' },
                { icon: <Mail />, value: 'contato@fhresolve.com.br', link: 'mailto:contato@fhresolve.com.br' },
                { icon: <MapPin />, value: 'Ratones, Florianópolis' },
              ].map((item, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <a href={item.link} className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.value}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="py-6 border-t border-[var(--color-neutral)]/20 flex justify-between items-center">
          <p className="text-sm">© {currentYear} FH Resolve</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="h-12 w-12 rounded-full bg-[var(--color-accent)] text-[var(--color-dark)] flex items-center justify-center"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;