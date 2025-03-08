import { Suspense, useEffect, useState, useCallback, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


// Componentes principais
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';

// Componentes com carregamento lazy
const About = lazy(() => import('./components/About'));
const Benefits = lazy(() => import('./components/Benefits'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Blog = lazy(() => import('./components/Blog'));
const Projects = lazy(() => import('./components/Projects'));
const Footer = lazy(() => import('./components/Footer'));
const ServiceMap = lazy(() => import('./components/ServiceMap'));

// Registra os plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Componente de fallback para carregamento lazy
const SectionLoader = () => (
  <div className="h-64 flex items-center justify-center bg-[var(--color-neutral)]/5">
    <div className="animate-spin h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  // const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Detecta preferência de tema do sistema
  const detectSystemTheme = useCallback(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);
  
  // Função para alternar tema
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [theme]);
  
  // Efeito para controlar a tela de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Reduzido para melhorar UX
    
    return () => clearTimeout(timer);
  }, []);

  // Inicializa o tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || detectSystemTheme();
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Ouvir alterações nas preferências do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        const newTheme = detectSystemTheme();
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [detectSystemTheme]);

  // Botão de voltar ao topo
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowScrollTop(window.scrollY > 500);
  //   };
    
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  
  // Inicializa animações com ScrollTrigger
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        // Animar as seções quando entrarem no viewport
        document.querySelectorAll('.animate-section').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });
      });
      
      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [loading]);

  // const scrollToTop = useCallback(() => {
  //   gsap.to(window, {
  //     duration: 1,
  //     scrollTo: { y: 0, autoKill: true },
  //     ease: 'power2.inOut'
  //   });
  // }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loader" />
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-screen"
        >
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="flex-grow">
            <Hero />
            
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <Benefits />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <Portfolio />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <Testimonials />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <ServiceMap />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <Blog />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </main>
          
          <Suspense fallback={<div className="h-20" />}>
            <Footer />
          </Suspense>
          
       
          
       
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;