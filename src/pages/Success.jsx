import { Link } from 'react-router-dom';

function Success() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-20 bg-white rounded-2xl shadow-lg text-center mt-16">
      <h1 className="text-4xl font-bold text-yellow-600 mb-6">Дякуємо за замовлення!</h1>
      <p className="text-gray-600 text-lg mb-10">
        Ваше замовлення прийнято. Ми зв’яжемося з вами найближчим часом для підтвердження.
      </p>
      <Link
        to="/catalog"
        className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl transition"
      >
        Повернутися в каталог
      </Link>
    </section>
  );
}

export default Success;
