import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;
    setIsSubmitting(true);

    const orderDetails = cartItems
      .map(item => `${item.title} — ${item.price} грн`)
      .join('\n');

    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      order_details: orderDetails,
      total_price: totalPrice,
    };

    emailjs.send(
      'service_vprt0l9',
      'template_qsljh8j',
      templateParams,
      'P3zvlW2ziZQEEJ7wS'
    )
    .then(async () => {
      await Promise.all(
        cartItems.map(item =>
          axios.delete(`http://localhost:5001/api/products/${item.id}`)
        )
      );
      clearCart();
      navigate('/success');
    })
    .catch((error) => {
      console.error('Помилка при надсиланні email або видаленні товарів:', error);
      alert('Не вдалося завершити оформлення замовлення. Спробуйте ще раз.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  if (cartItems.length === 0) {
    return (
      <section className="max-w-xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Кошик порожній</h1>
        <Link
          to="/catalog"
          className="inline-block mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl transition"
        >
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl px-8 py-10 mt-12">
      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-10">Оформлення замовлення</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          name="name"
          placeholder="Ваше ім’я"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Ваш телефон"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <textarea
          name="address"
          placeholder="Адреса доставки"
          value={formData.address}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-xl px-5 py-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
        ></textarea>

        <div className="flex justify-between items-center mt-6">
          <p className="text-xl font-bold">Разом: {totalPrice} грн</p>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Оформлення...' : 'Підтвердити замовлення'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
