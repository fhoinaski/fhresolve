import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';

const portfolioItems = [
  { 
    id: 1, 
    title: 'Instalação Elétrica', 
    description: 'Tomadas e interruptores em Jurerê.', 
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'elétrica' 
  },
  { 
    id: 2, 
    title: 'Reparo Hidráulico', 
    description: 'Conserto de vazamento em Ratones.', 
    image: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'hidráulica' 
  },
  { 
    id: 3, 
    title: 'Montagem de Móveis', 
    description: 'Armários e estantes em Canasvieiras.', 
    image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'montagem' 
  },
  { 
    id: 4, 
    title: 'Pintura Residencial', 
    description: 'Renovação de sala em Ingleses.', 
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'pintura' 
  },
  { 
    id: 5, 
    title: 'Troca de Chuveiro', 
    description: 'Instalação em Santo Antônio.', 
    image: 'https://images.unsplash.com/photo-1575033112078-1f71675e594f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'elétrica' 
  },
  { 
    id: 6, 
    title: 'Reparos em Drywall', 
    description: 'Correção em parede de Jurerê.', 
    image: 'https://images.unsplash.com/photo-1534172472807-65768f7056c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'montagem' 
  }
];

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredItems = filter === 'todos' 
    ? portfolioItems 
    : portfolioItems.filter((item) => item.category === filter);
  
  const categories = ['todos', 'elétrica', 'hidráulica', 'montagem', 'pintura'];

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-white dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Trabalhos Realizados
          </motion.span>
          <motion.h2 
            className="section-title mb-4 text-[var(--color-dark)]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nosso Portfólio
          </motion.h2>
          <motion.p 
            className="section-subtitle text-[var(--color-dark)]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conheça alguns dos nossos trabalhos recentes
          </motion.p>
          
          <div className="relative mb-10">
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Filter className="h-4 w-4" />
                <span>Filtrar: {filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
              </motion.button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    className="absolute z-10 mt-2 p-2 w-48 left-1/2 transform -translate-x-1/2 bg-[var(--color-card-bg)] rounded-lg shadow-lg border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => {
                          setFilter(category);
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                          filter === category 
                            ? 'bg-[var(--color-accent)] text-white font-medium' 
                            : 'hover:bg-[var(--color-accent)]/10 card-text'
                        }`}
                        whileHover={{ x: 3 }}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    filter === category 
                      ? 'bg-[var(--color-accent)] text-white font-medium' 
                      : 'bg-[var(--color-gray)] dark:bg-[var(--color-neutral)]/10 text-[var(--color-text)] dark:text-[var(--color-text)] hover:bg-[var(--color-neutral)]/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-[var(--color-card-bg)] rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20 cursor-pointer group transition-all duration-300"
                onClick={() => setSelectedImage(item.image)}
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy" 
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20"
                    initial={{ y: 50 }}
                    whileHover={{ y: 0 }}
                  >
                    <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/90">{item.description}</p>
                  </motion.div>
                  
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-block px-2 py-1 bg-[var(--color-accent)] text-white text-xs font-medium rounded-md backdrop-blur-sm">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.button 
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              <motion.img
                src={selectedImage}
                alt="Imagem ampliada"
                className="max-w-[90%] max-h-[90vh] rounded-lg shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;