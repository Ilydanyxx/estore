import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-light dark:bg-dark border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Левый блок */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img src="/assets/icons/logo.svg" alt="Logo" className="h-6" />
          <span className="font-semibold">E-Store © {new Date().getFullYear()}</span>
        </div>

        {/* Правый блок - навигация */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Link to="/catalog" className="hover:text-primary">Каталог</Link>
          <a href="#" className="hover:text-primary">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
