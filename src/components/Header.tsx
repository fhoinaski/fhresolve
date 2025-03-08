// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Wrench, MessageCircle } from 'lucide-react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#benefits' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Áreas Atendidas', href: '#map' },
    { name: 'Contato', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.slice(1));

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Aplicar um fundo mais sólido para melhorar legibilidade
  const getHeaderBackground = () => {
    if (isOpen) {
      return theme === 'light'
        ? 'bg-[var(--color-light)]'
        : 'bg-[var(--color-primary)]';
    }

    if (scrolled) {
      return theme === 'light'
        ? 'bg-[var(--color-light)] shadow-lg'
        : 'bg-[var(--color-primary)] shadow-lg';
    }

    // Quando não rolado, usamos um gradiente para garantir legibilidade
    return theme === 'light'
      ? 'bg-gradient-to-b from-[var(--color-light)] to-[var(--color-light)]/90 backdrop-blur-md'
      : 'bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 backdrop-blur-md';
  };

  // Para melhorar legibilidade adicionamos mais contraste nos textos
  const getLinkClass = (isActive: boolean) => {
    const baseClass = "relative font-medium transition-colors";
    
    if (isActive) {
      return `${baseClass} text-[var(--color-accent)] font-bold`;
    }
    
    // Aplicamos bordas sutis para melhorar legibilidade
    return theme === 'light' 
      ? `${baseClass} text-[var(--color-primary)] hover:text-[var(--color-accent)]` 
      : `${baseClass} text-[var(--color-paralel)] hover:text-[var(--color-accent)]`;
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-300 py-3 border-b ${
        theme === 'light' 
          ? 'border-[var(--color-neutral)]/20' 
          : 'border-[var(--color-dark)]/20'
      } ${getHeaderBackground()}`}
      aria-label="Navegação principal"
    >
      <div className="container flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          className="flex items-center gap-2 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Wrench className="h-8 w-8 text-[var(--color-accent)]" aria-hidden="true" />
          <span className="text-xl font-bold text-[var(--color-text)] dark:text-[var(--color-paralel)]">FH Resolve</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Menu de navegação desktop">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={getLinkClass(isActive)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-accent)] rounded-full"
                    layoutId="activeNavIndicator"
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--color-neutral)]/20 hover:bg-[var(--color-accent)]/20 transition-colors border border-[var(--color-neutral)]/30"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>

          <motion.a
            href="https://wa.me/5548991919791"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-full hover:bg-opacity-90 transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contato via WhatsApp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span className="text-sm font-medium">WhatsApp</span>
          </motion.a>

          <motion.button
            className="md:hidden z-50 p-2 bg-[var(--color-accent)] text-white rounded-lg shadow-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Menu Mobile - Modificado para funcionar corretamente */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              ref={navRef}
              className="fixed inset-0 pt-16 pb-8 px-4 md:hidden z-40 overflow-y-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: theme === 'light' ? 'var(--color-light)' : 'var(--color-primary)',
                top: headerRef.current ? headerRef.current.offsetHeight : 0
              }}
            >
              <div className="container py-4">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        className={`block py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                          isActive
                            ? `bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-bold border-l-4 border-[var(--color-accent)]`
                            : `text-[var(--color-text)] dark:text-[var(--color-paralel)] hover:bg-[var(--color-neutral)]/10`
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}

                  <div className="mt-6 pt-4 border-t border-[var(--color-neutral)]/20">
                    <a
                      href="https://wa.me/5548991919791"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white py-3 px-4 rounded-lg font-medium shadow-md"
                    >
                      <MessageCircle size={20} />
                      Fale pelo WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;