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
    <header className="header">
      <Link to="/">Головна</Link> | <Link to="/catalog">Каталог</Link>
      {isAdmin ? (
        <button onClick={logoutAdmin}>Вийти (Адмін)</button>
      ) : (
        <button onClick={() => setShowLogin(!showLogin)}>Адміністратор</button>
      )}
      {showLogin && (
        <div className="login-popup">
          <input
            type="text"
            placeholder="Логін"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Увійти</button>
        </div>
      )}
      
    </header>
  );
};

export default Header;