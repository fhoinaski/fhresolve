import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, PenTool as Tool, Lightbulb, Droplet, Hammer, CreditCard } from 'lucide-react';

const benefitsData = [
  { icon: <Shield className="h-12 w-12 text-[var(--color-accent)]" />, title: 'Confiabilidade', description: 'Serviços com segurança e garantia de qualidade.' },
  { icon: <Clock className="h-12 w-12 text-[var(--color-accent)]" />, title: 'Rapidez', description: 'Atendimento ágil para resolver seus problemas.' },
  { icon: <Tool className="h-12 w-12 text-[var(--color-accent)]" />, title: 'Profissionalismo', description: 'Excelência técnica e compromisso com resultados.' },
  { icon: <Lightbulb className="h-12 w-12 text-[var(--color-accent)]" />, title: 'Reparos Elétricos', description: 'Instalações e soluções elétricas.' },
  { icon: <Droplet className="h-12 w-12 text-[var(--color-accent)]" />, title: 'Serviços Hidráulicos', description: 'Reparos e instalações hidráulicas.' },
  { icon: <Hammer className="h-12 w-12 text-[var(--color-accent)]" />, title: 'Serviços Gerais', description: 'Montagem e pequenos reparos.' },
  { icon: <CreditCard className="h-12 w-12 text-[var(--color-accent)]" />, title: 'Parcelamento', description: 'Pague em até 12x sem juros no cartão.' },
];

const Benefits: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="benefits" className="py-20 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="animate-section text-center mb-16">
          <h2 className="section-title text-[var(--color-text)] dark:text-[var(--color-text)]">Nossos Serviços e Diferenciais</h2>
          <p className="section-subtitle dark:text-opacity-80 max-w-3xl mx-auto">
            Soluções completas para manutenção residencial, com foco em qualidade e satisfação.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              className="card dark:text-[var(--color-text)] hover:bg-[var(--color-neutral)]/10 dark:hover:bg-[var(--color-dark)]/10 border border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[var(--color-text)] dark:text-[var(--color-text)]">{benefit.title}</h3>
              <p className="text-[var(--color-text)]/80 dark:text-opacity-80 dark:text-[var(--color-text)]">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;