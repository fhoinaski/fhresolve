import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Clock, Zap, Droplet, Wrench, CreditCard } from 'lucide-react';

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const benefitsData = [
    { 
      icon: <ShieldCheck className="h-8 w-8" />, 
      title: 'Confiabilidade', 
      description: 'Serviços com garantia de qualidade.' 
    },
    { 
      icon: <Clock className="h-8 w-8" />, 
      title: 'Rapidez', 
      description: 'Atendimento ágil e eficiente.' 
    },
    { 
      icon: <Zap className="h-8 w-8" />, 
      title: 'Reparos Elétricos', 
      description: 'Soluções elétricas completas.' 
    },
    { 
      icon: <Droplet className="h-8 w-8" />, 
      title: 'Serviços Hidráulicos', 
      description: 'Reparos e instalações.' 
    },
    { 
      icon: <Wrench className="h-8 w-8" />, 
      title: 'Serviços Gerais', 
      description: 'Montagem e reparos diversos.' 
    },
    { 
      icon: <CreditCard className="h-8 w-8" />, 
      title: 'Parcelamento', 
      description: 'Até 12x sem juros.' 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section 
      id="benefits" 
      ref={sectionRef} 
      className="py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]"
    >
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4">
            Nossos Diferenciais
          </span>
          <h2 className="section-title mb-4">Serviços de Qualidade</h2>
          <p className="section-subtitle">Soluções completas para sua casa</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              className="card dark:bg-[var(--color-card-bg)] hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-medium mb-2 card-text">{benefit.title}</h3>
                <p className="card-text-secondary mb-4">{benefit.description}</p>
                <div className="mt-auto pt-2">
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center text-[var(--color-accent)] text-sm font-medium"
                    whileHover={{ x: 3 }}
                  >
                    Saiba mais
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent)]/90 transition-all shadow-md"
          >
            Solicitar Orçamento
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;