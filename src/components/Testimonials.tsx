import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Ana Silva', location: 'Jurerê', rating: 5, text: 'Serviço rápido e confiável! O Fernando resolveu um problema elétrico que outros não conseguiram identificar. Super recomendo!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Carlos Mendes', location: 'Ratones', rating: 5, text: 'Excelente profissional! Pontual, organizado e resolveu o vazamento no banheiro com muita eficiência. Meu contato fixo para reparos!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'Mariana Costa', location: 'Canasvieiras', rating: 5, text: 'Contratei para montar os móveis do meu apartamento novo e fiquei muito satisfeita. Trabalho impecável e preço justo!', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'Roberto Almeida', location: 'Ingleses', rating: 5, text: 'Reparo urgente na pia da cozinha resolvido em menos de uma hora. Atendimento super rápido. Recomendo!', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [current, autoplay]);

  return (
    <section id="testimonials" className="py-20 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="animate-section text-center mb-16">
          <h2 className="section-title text-[var(--color-text)] dark:text-[var(--color-text)]">O Que Nossos Clientes Dizem</h2>
          <p className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto">
            A satisfação dos nossos clientes é o nosso maior orgulho. Confira alguns depoimentos.
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="absolute -top-10 -left-10 opacity-10">
            <Quote className="h-24 w-24 text-[var(--color-accent)]" />
          </div>

          <div className="overflow-hidden relative rounded-xl bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 p-6 md:p-10 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--color-accent)] shadow-md">
                    <img
                      src={testimonials[current].image}
                      alt={`Cliente ${testimonials[current].name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic text-[var(--color-text)] dark:text-[var(--color-text)]/90 leading-relaxed">"{testimonials[current].text}"</p>
                  <div>
                    <h4 className="font-semibold text-xl text-[var(--color-text)] dark:text-[var(--color-text)]">{testimonials[current].name}</h4>
                    <p className="text-[var(--color-accent)]">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                className="p-3 rounded-full bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 hover:bg-[var(--color-accent)]/30 transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-6 w-6 text-[var(--color-accent)]" />
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrent(index)}
                    whileHover={{ scale: 1.1 }}
                    className={`w-3 h-3 rounded-full transition-all ${current === index ? 'bg-[var(--color-accent)] w-6' : 'bg-[var(--color-accent)]/30'}`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                className="p-3 rounded-full bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 hover:bg-[var(--color-accent)]/30 transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-6 w-6 text-[var(--color-accent)]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;