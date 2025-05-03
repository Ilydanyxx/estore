import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const [loadingId, setLoadingId] = useState(null);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleRemoveFromCart = async (itemId) => {
    setLoadingId(itemId);
    try {
      const itemToReturn = cartItems.find(item => item.id === itemId);

      if (itemToReturn) {
        removeFromCart(itemId);
        await axios.put(`http://localhost:5001/api/products/${itemToReturn.id}`, {
          is_hidden: false
        });
      } else {
        alert('Товар не знайдено в кошику');
      }
    } catch (error) {
      console.error('Помилка при видаленні товару з кошика:', error);
      alert('Сталася помилка при обробці вашого запиту. Спробуйте ще раз.');
    } finally {
      setLoadingId(null);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16 text-center bg-white rounded-2xl shadow-lg mt-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Кошик порожній</h1>
        <Link
          to="/catalog"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl transition"
        >
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Ваш кошик</h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4"
          >
            <div>
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-gray-500">{item.price} грн × {item.quantity || 1}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              disabled={loadingId === item.id}
              className="text-red-600 hover:underline disabled:opacity-50"
            >
              {loadingId === item.id ? 'Видалення...' : 'Видалити'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-end gap-4">
        <p className="text-xl font-bold text-gray-800">Разом: {totalPrice} грн</p>
        <Link
          to="/checkout"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl transition text-center"
        >
          Перейти до оформлення
        </Link>
      </div>
    </section>
  );
}

export default Cart;
