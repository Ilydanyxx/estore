import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Здесь будет отправка данных на сервер
    console.log('Оформление заказа:', { formData, cartItems });

    clearCart(); // очищаем корзину после оформления
    navigate('/success'); // переадресация на страницу успешного заказа
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
      <h1 className="text-3xl font-semibold mb-8 text-center">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-6">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Ваш телефон"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <textarea
          name="address"
          placeholder="Ваш адрес доставки"
          value={formData.address}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold">Итого: {totalPrice} ₽</p>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Подтвердить заказ
          </button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
