import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Wrench, Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Impede scroll durante a animação
    document.documentElement.classList.add('no-scroll');
    
    // Referencias aos elementos DOM
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const textContainer = textRef.current;
    
    if (!container || !wrapper || !textContainer) return;
    
    // Cria o contexto para GSAP trabalhar com ScrollTrigger
    const ctx = gsap.context(() => {
      // Configuração inicial - esconde elementos
      gsap.set('.loader-particle', { 
        scale: 0,
        opacity: 0,
        rotate: 'random(-180, 180)'
      });
      
      gsap.set('.brand-icon', { 
        opacity: 0,
        scale: 0,
        rotate: -45
      });
      
      gsap.set('.brand-text-part', { 
        opacity: 0,
        y: 100
      });
      
      gsap.set('.underline-loading', { 
        scaleX: 0
      });
      
      gsap.set('.loader-subtitle', { 
        opacity: 0,
        y: 20
      });
      
      gsap.set('.loading-progress', { 
        scaleX: 0,
        transformOrigin: 'left'
      });
      
      // Cria a timeline de animação
      const tl = gsap.timeline({
        onComplete: () => {
          // Timeline para remover a tela de loading
          const exitTl = gsap.timeline({
            onComplete: () => {
              document.documentElement.classList.remove('no-scroll');
            }
          });
          
          // Anima os elementos para saírem
          exitTl
            .to('.loading-container', { 
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut'
            })
            .to('.loading-wrapper', {
              y: -100,
              duration: 0.8,
              ease: 'power3.in'
            }, '<');
        }
      });
      
      // Cria efeito de espalhamento de partículas
      tl.to('.loader-particle', {
        scale: 1,
        opacity: 0.8,
        stagger: 0.03,
        duration: 0.4,
        rotate: 'random(-20, 20)',
        ease: 'back.out(2)'
      });
      
      // Anima o ícone principal
      tl.to('.brand-icon', {
        opacity: 1, 
        scale: 1,
        rotate: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.2');
      
      // Anima o texto da marca
      tl.to('.brand-text-part', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.7)'
      }, '-=0.5');
      
      // Anima a linha abaixo do texto
      tl.to('.underline-loading', {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.4');
      
      // Anima o subtítulo
      tl.to('.loader-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
      
      // Anima a barra de progresso
      tl.to('.loading-progress', {
        scaleX: 1,
        duration: 1.8,
        ease: 'power1.inOut'
      }, '-=0.2');
      
      // Cria movimento de partículas flutuantes
      gsap.to('.loader-particle', {
        x: 'random(-30, 30)',
        y: 'random(-30, 30)',
        rotation: 'random(-40, 40)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
      });
    }, container);
    
    // Cleanup
    return () => {
      ctx.revert();
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);
  
  // Função para criar partículas
  const renderParticles = () => {
    const particles = [];
    const colors = ['#40C4FF', '#F39C12', '#FFFFFF'];
    
    for (let i = 0; i < 20; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const randomPosition = {
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      };
      
      particles.push(
        <div 
          key={i}
          className="loader-particle absolute rounded-full"
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            top: randomPosition.top,
            left: randomPosition.left,
            filter: 'blur(1px)'
          }}
        />
      );
    }
    return particles;
  };
  
  return (
    <motion.div
      ref={containerRef}
      className="loading-container fixed inset-0 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Partículas decorativas */}
      {renderParticles()}
      
      {/* Conteúdo central */}
      <div ref={wrapperRef} className="loading-wrapper relative z-10 flex flex-col items-center">
        <div ref={textRef} className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <Wrench className="brand-icon h-16 w-16 text-[var(--color-accent)]" />
            <div className="flex flex-col">
              <h1 className="brand-text-part text-5xl md:text-6xl font-bold text-[var(--color-paralel)] font-poppins">
                FH
              </h1>
              <h1 className="brand-text-part text-5xl md:text-6xl font-bold text-[var(--color-accent)] font-poppins">
                Resolve
              </h1>
            </div>
          </div>
          
          <div className="underline-loading h-1 w-60 bg-[var(--color-secondary)] rounded-full mb-6 transform origin-left"></div>
          
          <div className="flex items-center gap-2 mb-10">
            <Sparkles className="h-5 w-5 text-[var(--color-secondary)]" />
            <p className="loader-subtitle text-lg md:text-xl text-white font-inter">
              Soluções para sua casa em Florianópolis
            </p>
          </div>
          
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="loading-progress h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)]"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;