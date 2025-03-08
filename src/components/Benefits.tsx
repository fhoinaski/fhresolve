import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Clock,  Lightbulb, Droplet, Hammer, CreditCard, ArrowRight } from 'lucide-react';

const Benefits: React.FC = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const benefitsData = [
    { icon: <Shield className="h-10 w-10" />, title: 'Confiabilidade', description: 'Serviços com garantia de qualidade.' },
    { icon: <Clock className="h-10 w-10" />, title: 'Rapidez', description: 'Atendimento ágil e eficiente.' },
    // { icon: <Tool className="h-10 w-10" />, title: 'Profissionalismo', description: 'Compromisso com resultados.' },
    { icon: <Lightbulb className="h-10 w-10" />, title: 'Reparos Elétricos', description: 'Soluções elétricas completas.' },
    { icon: <Droplet className="h-10 w-10" />, title: 'Serviços Hidráulicos', description: 'Reparos e instalações.' },
    { icon: <Hammer className="h-10 w-10" />, title: 'Serviços Gerais', description: 'Montagem e reparos.' },
    { icon: <CreditCard className="h-10 w-10" />, title: 'Parcelamento', description: 'Até 12x sem juros.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="benefits" ref={sectionRef} className="py-16 md:py-24 bg-[var(--color-light)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}>
          <h2 className="section-title">Nossos Diferenciais</h2>
          <p className="section-subtitle">Soluções completas para sua casa.</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              className="card flex flex-col items-center text-center p-6 hover:shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-[var(--color-accent)] mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-[var(--color-text)]/80 dark:text-[var(--color-paralel)] mb-4">{benefit.description}</p>
              <a href="#contact" className="text-[var(--color-accent)] text-sm hover:underline flex items-center gap-1">
                Saiba mais <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}>
          <a href="#contact" className="btn btn-primary inline-flex items-center gap-2">
            Solicitar Orçamento <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;