import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false); // Додаємо стан для індикатора завантаження
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleRemoveFromCart = async (itemId) => {
    setLoading(true); // Включаємо індикатор завантаження

    try {
      const itemToReturn = cartItems.find(item => item.id === itemId);
  
      if (itemToReturn) {
        // Видаляємо товар з кошика
        removeFromCart(itemId);

        // Повертаємо товар в каталог (is_hidden = false)
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
      setLoading(false); // Вимикаємо індикатор завантаження
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-semibold mb-6">Корзина пуста</h1>
        <Link
          to="/catalog"
          className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Ваша корзина</h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-500">{item.price} грн × {item.quantity || 1}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="text-red-500 hover:underline"
              disabled={loading} // Забороняємо повторне натискання при завантаженні
            >
              {loading ? 'Видалення...' : 'Видалити'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <p className="text-xl font-bold">Разом: {totalPrice} грн</p>
        <Link
          to="/checkout"
          className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors text-center"
        >
          Перейти до оформлення
        </Link>
      </div>
    </section>
  );
}

export default Cart;
