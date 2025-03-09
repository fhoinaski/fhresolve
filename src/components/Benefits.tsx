import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Clock, Zap, Droplet, Wrench, CreditCard, ArrowRight } from 'lucide-react';

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const benefitsData = [
    { 
      icon: <ShieldCheck className="h-7 w-7" />, 
      title: 'Confiabilidade', 
      description: 'Serviços com garantia.' 
    },
    { 
      icon: <Clock className="h-7 w-7" />, 
      title: 'Rapidez', 
      description: 'Atendimento ágil.' 
    },
    { 
      icon: <Zap className="h-7 w-7" />, 
      title: 'Serviços Elétricos', 
      description: 'Soluções completas.' 
    },
    { 
      icon: <Droplet className="h-7 w-7" />, 
      title: 'Serviços Hidráulicos', 
      description: 'Reparos e instalações.' 
    },
    { 
      icon: <Wrench className="h-7 w-7" />, 
      title: 'Serviços Gerais', 
      description: 'Montagem e reparos.' 
    },
    { 
      icon: <CreditCard className="h-7 w-7" />, 
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
      className="py-16 sm:py-20 bg-[var(--color-gray)] dark:bg-[var(--color-gray)]"
    >
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="section-title mb-4">Soluções Completas</h2>
          <p className="section-subtitle">O que podemos fazer por você</p>
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
              className="relative z-10 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="card h-full flex flex-col dark:bg-[var(--color-card-bg)] transition-all duration-500 
                            border-2 border-transparent group-hover:border-[var(--color-accent)]/20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/5 rounded-bl-full -z-10 
                              group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all duration-500"></div>
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full 
                                bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-5
                                group-hover:bg-[var(--color-accent)]/20 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3 card-text">{benefit.title}</h3>
                  <p className="text-[var(--color-secondary)] mb-5">{benefit.description}</p>
                  <div className="mt-auto pt-4">
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center text-[var(--color-accent)] text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Saiba mais
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-md font-medium hover:bg-[var(--color-accent)]/90 transition-all shadow-md"
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