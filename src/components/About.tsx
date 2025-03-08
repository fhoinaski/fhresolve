import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { PenTool as Tool, Clock, MapPin, Award, Shield, Sparkles, Check } from 'lucide-react';
import { gsap } from 'gsap';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Efeito de parallax suave no scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Reduzir o efeito de parallax em dispositivos móveis
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  
  // Animação para a experiência em anos
  useEffect(() => {
    if (inView) {
      const counter = { value: 0 };
      const counterElement = document.getElementById('experience-counter');
      
      gsap.to(counter, {
        value: 5,
        duration: 2,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterElement) {
            counterElement.textContent = `+${Math.ceil(counter.value)}`;
          }
        }
      });
    }
  }, [inView]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  
  // Elementos do card com informações
  const cardInfo = [
    { 
      icon: <Tool className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--color-accent)] mb-2" />,
      title: 'Experiência',
      desc: 'Profissional qualificado',
      delay: 0
    },
    { 
      icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--color-accent)] mb-2" />,
      title: 'Agilidade',
      desc: 'Atendimento rápido',
      delay: 0.1
    },
    { 
      icon: <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--color-accent)] mb-2" />,
      title: 'Localidade',
      desc: 'Florianópolis e região',
      delay: 0.2
    },
  ];

  // Lista de benefícios
  const benefits = [
    'Atendimento personalizado',
    'Orçamento sem compromisso',
    'Materiais de qualidade',
    'Garantia nos serviços'
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-[var(--color-gray)] dark:bg-[var(--color-primary)] relative overflow-hidden -mt-px"
    >
      {/* Elementos de fundo decorativos - responsivos */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 md:translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 md:w-64 sm:h-48 md:h-64 bg-[var(--color-secondary)]/5 rounded-full blur-3xl translate-y-1/4 md:translate-y-1/3 -translate-x-1/4 md:-translate-x-1/3"></div>
      
      {/* Padrão de pontos decorativos - reduzido para performance em mobile */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="relative w-full h-full">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-[var(--color-accent)] rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center mb-10 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-1 w-6 sm:w-10 bg-[var(--color-accent)]"></div>
            <span className="text-[var(--color-accent)] uppercase tracking-wider text-xs sm:text-sm font-medium">Nossa História</span>
            <div className="h-1 w-6 sm:w-10 bg-[var(--color-accent)]"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title text-center text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Sobre o Serviço
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative order-2 md:order-1"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="absolute -top-6 -left-6 text-4xl sm:text-5xl text-[var(--color-accent)]/20 font-bold hidden sm:block"
            >
              "
            </motion.span>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg mb-4 sm:mb-6 text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)] leading-relaxed"
            >
              <span className="font-semibold text-[var(--color-accent)]">FH Resolve</span> oferece serviços
              profissionais de manutenção residencial em Florianópolis. Com segurança e praticidade, atendemos
              Ratones, Jurerê e região.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg mb-4 sm:mb-6 text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)] leading-relaxed"
            >
              Especializado em resolver problemas do dia a dia, entregamos soluções rápidas e eficientes para manter
              sua casa em perfeito estado.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-[var(--color-light)]/50 dark:bg-[var(--color-dark)]/30 rounded-lg backdrop-blur-sm"
            >
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-[var(--color-secondary)] flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-[var(--color-text)] dark:text-[var(--color-paralel)]">Compromisso com Qualidade</h3>
                <p className="text-sm sm:text-base text-[var(--color-text)]/80 dark:text-opacity-80 dark:text-[var(--color-text)]">
                  Cada serviço é realizado com excelência e garantia
                </p>
              </div>
            </motion.div>

            {/* Lista de benefícios - Novo para adicionar mais conteúdo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6 hidden sm:block"
            >
              <h3 className="font-medium text-base sm:text-lg mb-3 text-[var(--color-text)] dark:text-[var(--color-paralel)]">
                Por que nos escolher?
              </h3>
              <ul className="space-y-2">
                {benefits.map((benefit, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                      <Check size={12} className="text-[var(--color-accent)]" />
                    </div>
                    <span className="text-sm sm:text-base text-[var(--color-text)] dark:text-opacity-90 dark:text-[var(--color-text)]">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Cards em grid responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {cardInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: item.delay + 0.6 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="card flex flex-col items-center text-center p-3 sm:p-4 md:p-5 hover:border-[var(--color-accent)]/40 hover:shadow-md hover:shadow-[var(--color-accent)]/10 transition-all duration-300"
                >
                  <div className="relative">
                    {item.icon}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-[var(--color-accent)]/20 z-[-1]"
                    />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text)] dark:text-opacity-80 dark:text-[var(--color-text)]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Imagem com ajustes na posição do botão */}
<motion.div
  ref={imageRef}
  style={{ y, scale: imageScale }}
  initial={{ opacity: 0, x: 50 }}
  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
  className="relative order-1 md:order-2 mb-8 md:mb-0"
>
  <div className="relative">
    <div className="aspect-video sm:aspect-square md:aspect-video rounded-xl overflow-hidden shadow-lg sm:shadow-2xl border border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20 group">
      <div className="absolute inset-0 bg-[var(--color-accent)]/10 dark:bg-[var(--color-accent)]/5 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
      <motion.img
        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        alt="Serviço de manutenção residencial em Florianópolis"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        transition={{ duration: 0.8 }}
        loading="lazy"
      />
    </div>
    
    {/* Decoração - ajuste de posições para responsividade */}
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
      className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-10"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[var(--color-accent)] blur-md opacity-40 rounded-lg"></div>
        <div className="relative bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] text-[var(--color-dark)] dark:text-[var(--color-primary)] p-3 sm:p-4 rounded-lg shadow-xl">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            <p className="font-bold text-base sm:text-lg" id="experience-counter">+5</p>
          </div>
          <p className="text-xs sm:text-sm">de experiência</p>
        </div>
      </div>
    </motion.div>
    
    {/* Elemento decorativo adicional - escondido em telas muito pequenas */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute top-1/2 left-0 sm:-left-6 md:-left-8 transform -translate-y-1/2 bg-[var(--color-light)] dark:bg-[var(--color-primary)] p-2 sm:p-3 md:p-4 rounded-lg shadow-lg hidden sm:block"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-secondary)]" />
        <p className="text-xs sm:text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-paralel)]">Serviço de confiança</p>
      </div>
    </motion.div>
  </div>
  
  {/* Botão CTA abaixo da imagem para mobile em vez de sobreposto */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="mt-6 sm:hidden"
  >
    <a
      href="#contact"
      className="block w-full text-center py-2 px-4 bg-[var(--color-accent)] text-white rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors shadow-lg"
    >
      Solicitar orçamento
    </a>
  </motion.div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;