import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MessageCircle, CreditCard, ArrowDown, Wrench, Droplet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, index }) => (
  <motion.div
    className="service-card bg-white/10 dark:bg-white/5 backdrop-blur-sm dark:backdrop-blur-md p-4 rounded-xl border border-white/20 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
  >
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1 text-[var(--color-text)]">{title}</h3>
        <p className="text-sm text-[var(--color-text)]/80">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const services = [
    { icon: <Wrench size={20} />, title: 'Reparos Elétricos', desc: 'Instalações e consertos elétricos profissionais.' },
    { icon: <Droplet size={20} />, title: 'Hidráulica', desc: 'Soluções para vazamentos e encanamentos.' },
    { icon: <Wrench size={20} />, title: 'Serviços Gerais', desc: 'Montagem de móveis e pequenos reparos.' },
  ];

  useEffect(() => {
    const heroElement = heroRef.current;
    const contentElement = contentRef.current;

    if (!heroElement || !contentElement) return;

    // Timeline principal com sequência de animações
    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      delay: 0.3
    });
    
    // Animação do fundo com parallax suave
    gsap.to('.hero-bg', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Função para scroll suave para a próxima seção
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[140vh] sm:min-h-[120vh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-0 pb-24 sm:pb-12" // Altura aumentada e padding ajustado
    >
      {/* Background minimalista e moderno */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574873934798-d7ef3dc98c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Overlay com gradiente mais limpo e moderno */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/90 via-[var(--color-primary)]/80 to-[var(--color-primary)]/70"></div>
      </div>

      {/* Conteúdo principal */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 max-w-xl">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/30"
            >
              <span className="text-sm font-medium text-[var(--color-accent)]">Manutenção Residencial</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4 font-jakarta leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block">Serviços de</span>
              <span className="text-[var(--color-accent)]">Manutenção</span>
              <span className="block">em Florianópolis</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-[var(--color-text)]/80 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Soluções rápidas e profissionais para reparos elétricos, hidráulicos e serviços gerais na sua casa ou empresa.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-text-light)] rounded-lg font-medium hover:bg-[var(--color-accent)]/90 transition-all shadow-md"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={18} />
                Solicitar Orçamento
              </motion.a>
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--color-neutral)]/20 text-[var(--color-text)]"
                whileHover={{ backgroundColor: 'rgba(var(--color-neutral-rgb), 0.1)' }}
              >
                <CreditCard size={18} className="text-[var(--color-accent)]" />
                <span className="text-sm">
                  Até <strong>12x</strong> no cartão
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                desc={service.desc}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de scroll - ajustado para responsividade */}
      <motion.div 
        className="absolute bottom-8 sm:bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <span className="text-[var(--color-text)]/60 text-sm mb-2 font-medium tracking-wide">Saiba Mais</span>
          <ArrowDown className="text-[var(--color-accent)] h-10 w-5" />
        </motion.div>
      </motion.div>

      {/* Forma decorativa na parte inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-16 z-20">
        <svg 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="h-full w-full"
        >
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            className="fill-white dark:fill-[var(--color-light)]"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;