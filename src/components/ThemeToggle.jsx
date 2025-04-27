import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <motion.button
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      onClick={() => setDarkMode(!darkMode)}
      whileTap={{ scale: 0.9 }}
    >
      <img
        src={darkMode ? '/assets/icons/sun.svg' : '/assets/icons/moon.svg'}
        alt="Toggle Theme"
        className="h-6 w-6"
      />
    </motion.button>
  );
}

export default ThemeToggle;
