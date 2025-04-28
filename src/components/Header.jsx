import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

function Header() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-shadow ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Логотип */}
        <Link to="/" className="text-2xl font-bold text-primary">
          E-Store
        </Link>

        {/* Навигация */}
        <nav className="flex items-center gap-6">
          <NavLink to="/catalog" className="text-gray-700 hover:text-primary transition-colors">
            Каталог
          </NavLink>

          {/* Корзина */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-7 h-7 text-gray-700 hover:text-primary transition-colors" />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
