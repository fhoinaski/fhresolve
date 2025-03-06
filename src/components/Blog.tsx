import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="blog" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="animate-section text-center mb-12">
          <h2 className="section-title text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)]">Blog</h2>
          <p className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto">
            Em breve: Dicas de Manutenção Residencial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } }}
              className="card dark:text-[var(--color-text)] group border border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20 hover:bg-[var(--color-neutral)]/10 dark:hover:bg-[var(--color-dark)]/10"
            >
              <div className="h-48 bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-[var(--color-text)]/50 dark:text-opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)]">Artigo em Breve</h3>
                <p className="text-[var(--color-text)]/80 dark:text-opacity-80 mb-4">
                  Estamos preparando conteúdos exclusivos sobre manutenção residencial para ajudar você a cuidar melhor da sua casa.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[var(--color-accent)]">Em breve</span>
                  <button className="text-[var(--color-primary)] dark:text-[var(--color-text)] flex items-center gap-1 group-hover:gap-2 transition-all hover:text-[var(--color-accent)]">
                    <span>Saiba mais</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[var(--color-text)] dark:text-opacity-80 max-w-2xl mx-auto">
            Fique atento! Em breve teremos artigos com dicas valiosas sobre manutenção residencial, prevenção de problemas e cuidados com sua casa.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 btn btn-outline text-[var(--color-accent)]"
          >
            Ver Atualizações
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Blog;