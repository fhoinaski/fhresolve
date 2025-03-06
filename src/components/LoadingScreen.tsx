import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const loadingPhrases = [
    'Preparando sua experiência...',
    'Carregando soluções para sua casa...',
    'Quase pronto para resolver tudo!',
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add('no-scroll');
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 1000);

    return () => {
      document.documentElement.classList.remove('no-scroll');
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-[var(--color-primary)] dark:bg-[var(--color-dark)] flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="flex flex-col items-center"
      >
        <Wrench className="h-20 w-20 text-[var(--color-accent)] mb-4" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl font-bold text-[var(--color-light)] dark:text-[var(--color-light)] font-poppins"
        >
          FH Resolve
        </motion.h1>
        <motion.p
          key={phraseIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2 text-[var(--color-light)] dark:text-[var(--color-light)]/80 text-lg"
        >
          {loadingPhrases[phraseIndex]}
        </motion.p>
      </motion.div>
      <motion.div
        className="mt-8 w-64 h-2 bg-[var(--color-neutral)]/20 dark:bg-[var(--color-dark)]/20 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-[var(--color-accent)]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 1.5, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;