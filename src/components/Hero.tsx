import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MessageCircle, CreditCard, Sparkles, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  title: string;
  desc: string;
}

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const cardData: CardData[] = [
    { title: 'Reparos Elétricos', desc: 'Instalações e consertos elétricos.' },
    { title: 'Hidráulica', desc: 'Soluções para vazamentos e encanamentos.' },
    { title: 'Serviços Gerais', desc: 'Montagem e pequenos reparos.' },
  ];

  useEffect(() => {
    const heroElement = heroRef.current;
    const cardContainerElement = cardContainerRef.current;
    const titleElement = titleRef.current;

    if (!heroElement || !cardContainerElement || !titleElement) return;

    const titles = titleElement.querySelectorAll('.hero-title');
    const subtitleElement = subtitleRef.current;
    const descElement = descRef.current;
    const ctaElement = ctaRef.current;
    const cards = cardContainerElement.querySelectorAll('.service-card');

    // Configuração inicial para animação
    gsap.set([titles, subtitleElement, descElement, ctaElement], { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 20 });
    gsap.set('.hero-bg-overlay', { opacity: 0 });
    gsap.set('.scroll-indicator', { opacity: 0, y: 10 });
    
    // Timeline principal com sequência de animações - inicia imediatamente
    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      delay: 0.3 // Pequeno delay para permitir que a página seja renderizada
    });
    
    // Animação do fundo
    tl.to('.hero-bg-overlay', 
      { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
    );
    
    // Animação dos títulos e conteúdo
    tl.to(titles[0], { opacity: 1, y: 0, duration: 0.8 }, '-=0.8')
      .to(titles[1], { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(subtitleElement, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(descElement, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(ctaElement, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
    
    // Animação dos cards com stagger
    tl.to(cards, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'back.out(1.4)',
    }, '-=0.4');
    
    // Animação do indicador de scroll
    tl.to('.scroll-indicator', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.2');

    // Animação dos sparkles
    gsap.to('.hero-sparkle', { 
      opacity: 'random(0.3, 0.7)',
      scale: 'random(0.7, 1.3)',
      duration: 'random(1, 2)',
      delay: 'random(0.3, 1)',
      repeat: -1,
      yoyo: true,
      stagger: 0.1
    });

    // Parallax suave no scroll
    gsap.to('.hero-bg', {
      y: '20%',
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

  const renderSparkles = () => {
    const sparkles = [];
    for (let i = 0; i < 20; i++) {
      sparkles.push(
        <div
          key={i}
          className="hero-sparkle absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0, // Começa invisível
            filter: 'blur(1px)'
          }}
        />
      );
    }
    return sparkles;
  };

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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background com intensidade ajustada */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Overlay com menor opacidade para maior destaque */}
        <div className="hero-bg-overlay absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/80 via-[#1a1a1a]/70 to-[var(--color-secondary)]/30"></div>
        
        {/* Sparkles de fundo */}
        {renderSparkles()}
      </div>

      {/* Adicionamos um padding-top maior no mobile para evitar sobreposição com o header */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 sm:pt-32 sm:pb-16 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
            {/* Reposicionamos a tag de manutenção residencial */}
            <div ref={subtitleRef} className="mb-6 flex items-center">
              <div className="h-1 w-6 bg-[var(--color-accent)] mr-2 rounded-full"></div>
              <div className="text-base sm:text-lg font-medium text-white">Manutenção Residencial</div>
            </div>

            <div ref={titleRef} className="overflow-hidden mb-4">
              <h1 className="flex flex-col">
                <span className="hero-title text-4xl sm:text-5xl md:text-6xl font-bold font-oswald leading-tight tracking-tighter text-white">
                  FH
                </span>
                <span className="hero-title text-4xl sm:text-5xl md:text-6xl font-bold font-oswald leading-tight tracking-tighter text-[var(--color-accent)]">
                  Resolve
                </span>
              </h1>
            </div>

            <p ref={descRef} className="text-sm sm:text-base md:text-lg max-w-md leading-relaxed mb-6 text-white/90">
              Soluções simples e confiáveis para reparos elétricos, hidráulicos e serviços gerais na sua casa.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <motion.a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-semibold text-sm sm:text-base w-full sm:w-auto hover:bg-opacity-90 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={18} />
                Fale Comigo
              </motion.a>
              <motion.div 
                className="flex items-center gap-2 text-sm sm:text-base bg-white/15 py-2 px-4 rounded-full border border-white/20"
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <CreditCard size={16} className="text-[var(--color-accent)]" />
                <span className="text-white">
                  Até <strong className="text-[var(--color-accent)]">12x sem juros</strong>
                </span>
              </motion.div>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--color-secondary)]" />
              <p className="text-[var(--color-secondary)] italic text-sm sm:text-base">
                Atendimento em Florianópolis e região
              </p>
            </div>
          </div>

          <div ref={cardContainerRef} className="w-full lg:w-1/2 mt-6 lg:mt-0 flex flex-col gap-3 sm:gap-4">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                className="service-card bg-white/15 p-4 sm:p-5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="flex items-start">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[var(--color-accent)]/30 mr-3">
                    <div className="h-6 w-6 flex items-center justify-center rounded-full bg-[var(--color-accent)]">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 text-white">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-white/80">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div 
        className="scroll-indicator absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={scrollToNextSection}
      >
        <p className="text-xs text-white/80 uppercase tracking-widest mb-2">Saiba mais</p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={24} className="text-[var(--color-accent)]" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full block">
          <path
            fill="var(--color-gray)"
            fillOpacity="1"
            d="M0,96L60,85.3C120,75,240,53,360,48C480,43,600,53,720,69.3C840,85,960,107,1080,101.3C1200,96,1320,64,1380,48L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;