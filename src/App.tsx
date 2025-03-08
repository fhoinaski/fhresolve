import { Suspense, useEffect, useState, useCallback, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Componentes principais que carregam imediatamente
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';

// Componentes com carregamento lazy
const About = lazy(() => import('./components/About'));
const Benefits = lazy(() => import('./components/Benefits'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const ServiceMap = lazy(() => import('./components/ServiceMap'));
const Footer = lazy(() => import('./components/Footer'));

// Registra os plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Componente de fallback simples e elegante para carregamento lazy
const SectionLoader = () => (
  <div className="h-60 flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  
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
  
  // Efeito para controlar a tela de carregamento - timing reduzido para melhor UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
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
  
  // Inicializa animações com ScrollTrigger
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        // Animar elementos quando entrarem no viewport
        document.querySelectorAll('.animate-on-scroll').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
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