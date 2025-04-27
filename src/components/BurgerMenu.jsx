import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function BurgerMenu({ toggleMenu }) {
  return (
    <motion.div
      className="fixed inset-0 bg-light dark:bg-dark bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-xl z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link to="/" onClick={toggleMenu} className="hover:text-primary">
        Главная
      </Link>
      <Link to="/catalog" onClick={toggleMenu} className="hover:text-primary">
        Каталог
      </Link>
    </motion.div>
  );
}

export default BurgerMenu;
