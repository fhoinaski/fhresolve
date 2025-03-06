import React from 'react';
import { motion } from 'framer-motion';
import { PenTool as Tool, Clock, MapPin } from 'lucide-react';

const About: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="about"
      className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]"
    >
      <div className="container">
        <div className="animate-section">
          <h2 className="section-title text-center text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)]">Sobre o Serviço</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <p className="text-lg mb-6 text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)] leading-relaxed">
                <span className="font-semibold text-[var(--color-accent)]">FH Resolve</span> oferece serviços
                profissionais de manutenção residencial em Florianópolis. Com segurança e praticidade, atendemos
                Ratones, Jurerê e região.
              </p>
              <p className="text-lg mb-6 text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)] leading-relaxed">
                Especializado em resolver problemas do dia a dia, entregamos soluções rápidas e eficientes para manter
                sua casa em perfeito estado.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                  { icon: <Tool className="h-10 w-10 text-[var(--color-accent)] mb-2" />, title: 'Experiência', desc: 'Profissional qualificado' },
                  { icon: <Clock className="h-10 w-10 text-[var(--color-accent)] mb-2" />, title: 'Agilidade', desc: 'Atendimento rápido' },
                  { icon: <MapPin className="h-10 w-10 text-[var(--color-accent)] mb-2" />, title: 'Localidade', desc: 'Florianópolis e região' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    className="card flex flex-col items-center text-center p-5"
                  >
                    {item.icon}
                    <h3 className="font-semibold text-lg text-[var(--color-text)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text)] dark:text-opacity-80 dark:text-[var(--color-text)]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl border border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20">
                <motion.img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Serviço de manutenção residencial em Florianópolis"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[var(--color-accent)] text-[var(--color-dark)] dark:text-[var(--color-primary)] p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">+5 anos</p>
                <p className="text-sm">de experiência</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;