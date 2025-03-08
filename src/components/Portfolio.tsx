import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const portfolioItems = [
  { id: 1, title: 'Instalação Elétrica', description: 'Tomadas e interruptores em Jurerê.', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'elétrica' },
  { id: 2, title: 'Reparo Hidráulico', description: 'Conserto de vazamento em Ratones.', image: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'hidráulica' },
  // Outros itens mantidos
];

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('todos');

  const filteredItems = filter === 'todos' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="section-title">Portfólio</h2>
          <p className="section-subtitle">Nossos trabalhos recentes</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['todos', 'elétrica', 'hidráulica', 'montagem', 'pintura'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full ${filter === category ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-light)] text-[var(--color-text)]'}`}
                whileHover={{ scale: 1.05 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="card overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(item.image)}
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text)]/80 dark:text-[var(--color-paralel)]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                src={selectedImage}
                alt="Imagem ampliada"
                className="max-w-[90%] max-h-[90vh] rounded-lg shadow-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;