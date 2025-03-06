import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="animate-section text-center mb-12">
          <h2 className="section-title">Galeria de Projetos</h2>
          <p className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto">
            Novos projetos em breve
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-[var(--color-accent)]/10 dark:bg-[var(--color-accent)]/20 text-[var(--color-text)] dark:text-[var(--color-light)] p-8 md:p-12 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/20 dark:bg-[var(--color-accent)]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-secondary)]/10 dark:bg-[var(--color-secondary)]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <FolderOpen className="h-16 w-16 text-[var(--color-accent)] mb-4" />
              <h3 className="text-2xl font-semibold mb-4 font-poppins">Galeria de Projetos Futuros</h3>
              <p className="text-[var(--color-text)] dark:text-[var(--color-light)]/80 mb-6 leading-relaxed">
                Em breve, você verá uma galeria completa com fotos e detalhes dos nossos principais projetos de manutenção residencial em Florianópolis e região.
              </p>
              <ul className="space-y-3 mb-6">
                {['Reformas completas', 'Instalações elétricas', 'Reparos hidráulicos', 'Montagem de móveis'].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-[var(--color-accent)] rounded-full"></span>
                    <span className="text-[var(--color-text)] dark:text-[var(--color-light)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <div className="w-64 h-64 bg-[var(--color-neutral)]/10 dark:bg-[var(--color-dark)]/10 rounded-xl flex items-center justify-center border border-[var(--color-light)]/20 dark:border-[var(--color-dark)]/20 backdrop-blur-md shadow-md">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2 text-[var(--color-text)] dark:text-[var(--color-light)]">Em Construção</p>
                  <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-light)]/70 mb-4">Aguarde novidades</p>
                  <motion.button
                    whileHover={{ scale: 1.05, gap: '0.5rem' }}
                    className="inline-flex items-center gap-1 text-[var(--color-accent)] transition-all"
                  >
                    <span>Saiba mais</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;