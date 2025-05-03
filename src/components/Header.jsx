import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';


const Header = () => {
  const { isAdmin, loginAsAdmin, logoutAdmin } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const success = loginAsAdmin(username, password);
    if (success) {
      setShowLogin(false);
    } else {
      alert('Неправильний логін або пароль');
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <nav className="flex gap-6 text-lg font-medium text-gray-700">
        <Link to="/" className="hover:text-yellow-600 transition">Головна</Link>
        <Link to="/catalog" className="hover:text-yellow-600 transition">Каталог</Link>
      </nav>

      <div className="relative">
        {isAdmin ? (
          <button
            onClick={logoutAdmin}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Вийти (Адмін)
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition"
          >
            Адміністратор
          </button>
        )}

        {showLogin && (
          <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-50">
            <input
              type="text"
              placeholder="Логін"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg transition"
            >
              Увійти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
