import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Wrench, MessageCircle } from 'lucide-react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#benefits' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Áreas Atendidas', href: '#map' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-light)]/95 dark:bg-[var(--color-primary)]/95 shadow-md backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a href="#" className="flex items-center gap-2 text-[var(--color-primary)] dark:text-[var(--color-text)]">
              <Wrench className="h-8 w-8 text-[var(--color-accent)]" />
              <span className="text-2xl font-semibold font-poppins text-[var(--color-text)] dark:text-[var(--color-paralel)]">FH Resolve</span>
            </a>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-6"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium dark:text-[var(--color-text)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-[var(--color-neutral)] dark:bg-[var(--color-dark)]/50 text-[var(--color-text)]"
              aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
          </motion.nav>

          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-[var(--color-neutral)] dark:bg-[var(--color-dark)]/50 text-[var(--color-text)]"
              aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
            <button
              onClick={toggleMenu}
              className="text-[var(--color-text)] focus:outline-none"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="md:hidden overflow-hidden bg-[var(--color-light)]/95 dark:bg-[var(--color-primary)]/95 backdrop-blur-md"
        >
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-text)] py-3 px-4 border-b border-[var(--color-neutral)]/20 dark:border-[var(--color-dark)]/20 hover:bg-[var(--color-neutral)]/50 dark:hover:bg-[var(--color-dark)]/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.header>

      <motion.a
        href="https://wa.me/5548991919791"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50 md:hidden bg-[var(--color-secondary)] text-[var(--color-dark)] dark:text-[var(--color-primary)] p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-opacity-90"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="text-sm font-semibold">WhatsApp</span>
      </motion.a>
    </>
  );
};

export default Header;