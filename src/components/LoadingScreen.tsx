import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Wrench } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Impedir scroll durante a animação
    document.documentElement.classList.add('no-scroll');
    
    // Referências aos elementos DOM
    const container = containerRef.current;
    const logo = logoRef.current;
    
    if (!container || !logo) return;
    
    // Timeline com contexto GSAP
    const ctx = gsap.context(() => {
      // Timeline principal para a animação de loading
      const tl = gsap.timeline({
        onComplete: () => {
          // Timeline para remover a tela de loading
          const exitTl = gsap.timeline({
            onComplete: () => {
              document.documentElement.classList.remove('no-scroll');
            }
          });
          
          // Anima a saída da tela de loading
          exitTl
            .to('.loading-container', { 
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut'
            })
            .to('.loading-content', {
              y: -40,
              duration: 0.6,
              ease: 'power3.in'
            }, '<');
        }
      });
      
      // Configuração inicial da animação
      gsap.set('.logo-icon', { scale: 0, opacity: 0 });
      gsap.set('.logo-text', { y: 30, opacity: 0 });
      gsap.set('.loading-bar-progress', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.loading-message', { opacity: 0, y: 20 });
      
      // Anima o logo e a barra de progresso
      tl.to('.logo-icon', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      })
      .to('.logo-text', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.loading-message', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.loading-bar-progress', {
        scaleX: 1,
        duration: 1.8,
        ease: 'power1.inOut'
      }, '-=0.3');
    }, container);
    
    // Cleanup
    return () => {
      ctx.revert();
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);
  
  return (
    <motion.div
      ref={containerRef}
      className="loading-container fixed inset-0 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/95 flex items-center justify-center z-50 overflow-hidden"
    >
      <div 
        ref={logoRef} 
        className="loading-content relative z-10 flex flex-col items-center"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="logo-icon bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-6">
            <Wrench className="h-12 w-12 text-[var(--color-accent)]" />
          </div>
          
          <div className="logo-text flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-jakarta">
              FH<span className="text-[var(--color-accent)]">Resolve</span>
            </h1>
          </div>
        </div>
        
        <div className="loading-message text-white/80 text-sm font-medium mb-8">
          Carregando serviços de manutenção...
        </div>
        
        <div className="loading-bar w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="loading-bar-progress h-full bg-[var(--color-accent)]"></div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[var(--color-accent)]/5"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'pulse 10s infinite'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;