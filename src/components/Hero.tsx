import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CreditCard, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardData = [
    { title: 'Reparos Elétricos', desc: 'Instalações e consertos elétricos.' },
    { title: 'Hidráulica', desc: 'Soluções para vazamentos e encanamentos.' },
    { title: 'Serviços Gerais', desc: 'Montagem e pequenos reparos.' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] sm:min-h-[100vh] flex items-center justify-center bg-[var(--color-primary)] dark:bg-[var(--color-dark)] overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/90 to-[var(--color-secondary)]/30 dark:from-[var(--color-dark)]/90 dark:to-[var(--color-secondary)]/30"></div>

      {/* Main Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-[var(--color-paralel)] dark:text-[var(--color-paralel)] max-w-5xl mx-auto"
        >
          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-poppins leading-tight"
          >
            FH Resolve
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-medium mb-8 sm:mb-10 font-inter text-[var(--color-accent)]"
          >
            Manutenção Residencial Simples e Confiável
          </motion.p>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', transition: { duration: 0.3 } }}
                className="bg-[var(--color-neutral)]/10 dark:bg-[var(--color-dark)]/10 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-[var(--color-light)]/20 dark:border-[var(--color-dark)]/20 text-center"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--color-paralel)] dark:text-[var(--color-text)] mb-2">{card.title}</h3>
                <p className="text-sm sm:text-base text-[var(--color-paralel)]/80 dark:text-opacity-80 dark:text-[var(--color-paralel)]">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Payment Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-10"
          >
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--color-secondary)]" />
            <p className="text-sm sm:text-base md:text-lg text-[var(--color-text)] dark:text-[var(--color-light)]">
              Pague em até <span className="font-bold text-[var(--color-secondary)]">12x sem juros</span> no cartão
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <motion.a
              href="https://wa.me/5548991919791"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary flex items-center justify-center gap-2 text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 rounded-full bg-[var(--color-accent)] hover:bg-opacity-90 shadow-md w-full sm:w-auto"
            >
              <MessageCircle size={20} />
              Fale Comigo
            </motion.a>
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline flex items-center justify-center gap-2 text-base sm:text-lg font-medium px-6 sm:px-8 py-3 rounded-full border-2 border-[var(--color-light)]/50 dark:border-[var(--color-dark)]/50 hover:bg-[var(--color-light)]/10 dark:hover:bg-[var(--color-dark)]/10 w-full sm:w-auto"
            >
              <span>Saiba Mais</span>
              <ChevronDown size={20} />
            </motion.button>
          </motion.div>
        </motion.div>

      
      </div>
    </section>
  );
};

export default Hero;