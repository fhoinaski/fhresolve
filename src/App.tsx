import { Suspense, useEffect, useState, useCallback, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MessageCircle } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';

const About = lazy(() => import('./components/About'));
const Benefits = lazy(() => import('./components/Benefits'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const ServiceMap = lazy(() => import('./components/ServiceMap'));
const Footer = lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SectionLoader = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mb-4"></div>
    <p className="text-sm text-[var(--color-text)]/70">Carregando conteúdo...</p>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark'); // Tema escuro como padrão

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Define o tema escuro como padrão na inicialização
    const initialTheme = 'dark';
    setTheme(initialTheme);
    localStorage.setItem('theme', initialTheme); // Salva no localStorage
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Opcional: continua ouvindo mudanças no sistema, mas só aplica se o usuário não tiver uma preferência salva
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []); // Removido detectSystemTheme da dependência, pois não é mais usado

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
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
              <Benefits />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <About />
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
          <motion.a
            href="https://wa.me/5548991919791"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[var(--color-accent)] text-white p-3 rounded-full shadow-lg z-50 flex items-center justify-center"
            whileHover={{ scale: 1.1, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            aria-label="Entre em contato via WhatsApp"
          >
            <MessageCircle size={26} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;