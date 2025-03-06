import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
const ServiceMap = React.lazy(() => import('./components/ServiceMap'));
import Contact from './components/Contact';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  // Efeito para controlar a tela de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

 // Efeito para controlar o tema usando data-theme
 useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

  // Efeito para configurar as animações quando o carregamento terminar
  useEffect(() => {
    if (!loading) {
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, [loading]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="flex-grow pt-20">
            <Hero />
            <About />
            <Benefits />
            <Portfolio />
            <Testimonials />
            <Suspense fallback={<div className="h-[400px] bg-[var(--color-neutral)] animate-pulse" />}>
              <ServiceMap />
            </Suspense>
            <Contact />
            <Blog />
            <Projects />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;