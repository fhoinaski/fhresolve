import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ZoomIn } from 'lucide-react';

const portfolioItems = [
  { id: 1, title: 'Instalação Elétrica', description: 'Instalação de tomadas e interruptores em Jurerê.', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'elétrica' },
  { id: 2, title: 'Reparo Hidráulico', description: 'Conserto de vazamento em banheiro em Ratones.', image: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'hidráulica' },
  { id: 3, title: 'Montagem de Móveis', description: 'Montagem de armário planejado em Canasvieiras.', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'montagem' },
  { id: 4, title: 'Instalação de Chuveiro', description: 'Substituição de chuveiro elétrico em Ingleses.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'elétrica' },
  { id: 5, title: 'Pintura Residencial', description: 'Pintura de sala de estar em Santo Antônio de Lisboa.', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'pintura' },
  { id: 6, title: 'Instalação de Prateleiras', description: 'Fixação de prateleiras em Vargem Pequena.', image: 'https://images.unsplash.com/photo-1594128956930-194f6bd4caaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'montagem' },
];

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('todos');

  const filteredItems = filter === 'todos' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="portfolio" className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="animate-section text-center mb-12">
          <h2 className="section-title text-[var(--color-text)] dark:text-[var(--color-text)]">Portfólio de Serviços</h2>
          <p className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto">
            Conheça alguns dos nossos trabalhos realizados em Florianópolis e região.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['todos', 'elétrica', 'hidráulica', 'montagem', 'pintura'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === category ? 'bg-[var(--color-accent)] text-[var(--color-dark)] dark:text-[var(--color-primary)]' : 'bg-[var(--color-light)] dark:bg-[var(--color-dark)] text-[var(--color-text)] dark:text-[var(--color-text)] hover:bg-[var(--color-accent)]/10'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ y: -10, rotateX: 5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-xl shadow-md border border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20 hover:bg-[var(--color-neutral)]/10 dark:hover:bg-[var(--color-dark)]/10 cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Reparos residenciais em ${item.title} por FH Resolve`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 to-transparent dark:from-[var(--color-dark)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-[var(--color-light)] text-xl font-semibold">{item.title}</h3>
                  <p className="text-[var(--color-light)]/80 text-sm">{item.description}</p>
                  <div className="absolute top-4 right-4 bg-[var(--color-light)]/20 dark:bg-[var(--color-dark)]/20 p-2 rounded-full backdrop-blur-sm">
                    <ZoomIn className="h-5 w-5 text-[var(--color-light)]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-dark)]/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Serviço ampliado" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute top-2 right-2 bg-[var(--color-light)]/20 dark:bg-[var(--color-dark)]/20 p-2 rounded-full backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <ChevronLeft className="h-6 w-6 text-[var(--color-light)]" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;