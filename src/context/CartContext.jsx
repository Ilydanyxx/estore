import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // новий стейт для адміна

  const loginAsAdmin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, isAdmin, loginAsAdmin, logoutAdmin }}>
      {children}
    </CartContext.Provider>
  );
};