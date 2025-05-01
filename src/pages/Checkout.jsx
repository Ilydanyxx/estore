import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import emailjs from 'emailjs-com';

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
    .then(() => {
      clearCart();
      navigate('/success');
    })
    .catch((error) => {
      console.error('Помилка при надсиланні email:', error);
      alert('Не вдалося надіслати замовлення. Спробуйте ще раз.');
    });
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
          className="border border-gray-300 rounded-lg p-4"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Ваш телефон"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-4"
        />
        <textarea
          name="address"
          placeholder="Ваш адрес доставки"
          value={formData.address}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-4 h-32 resize-none"
        ></textarea>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold">Итого: {totalPrice} грн</p>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg"
          >
            Подтвердить заказ
          </button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
