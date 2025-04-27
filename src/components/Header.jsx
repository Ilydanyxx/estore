import { useState } from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import ThemeToggle from './ThemeToggle';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-light dark:bg-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Логотип */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/icons/logo.svg" alt="Logo" className="h-8" />
          <span className="text-xl font-bold">E-Store</span>
        </Link>

        {/* Кнопки */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {/* Бургер меню (мобилка) */}
          <button className="md:hidden" onClick={toggleMenu}>
            <img
              src={menuOpen ? '/assets/icons/close.svg' : '/assets/icons/menu.svg'}
              alt="Menu"
              className="h-6 w-6"
            />
          </button>

          {/* Навигация (десктоп) */}
          <nav className="hidden md:flex space-x-8 text-base">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <Link to="/catalog" className="hover:text-primary">Каталог</Link>
          </nav>
        </div>
      </div>

      {/* Выпадающее меню для мобильных */}
      {menuOpen && <BurgerMenu toggleMenu={toggleMenu} />}
    </header>
  );
}

export default Header;
