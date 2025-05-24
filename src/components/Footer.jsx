import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        {/* Лівий блок */}
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <img src="/src/assets/images/photo_2025-04-15_17-41-41.jpg" alt="Logo" className="h-6" />
          <span className="font-semibold text-gray-800">
            E-Store © {new Date().getFullYear()}
          </span>
        </div>

        {/* Правий блок - навігація */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-yellow-600 transition-colors">
            Головна
          </Link>
          <Link to="/catalog" className="hover:text-yellow-600 transition-colors">
            Каталог
          </Link>
          <a href="#" className="hover:text-yellow-600 transition-colors">
            Політика конфіденційності
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
