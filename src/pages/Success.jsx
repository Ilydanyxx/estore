import { Link } from 'react-router-dom';

function Success() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6 text-primary">Спасибо за заказ!</h1>
      <p className="text-gray-600 mb-10">
        Ваш заказ принят. Мы скоро свяжемся с вами для подтверждения.
      </p>
      <Link
        to="/catalog"
        className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Вернуться в каталог
      </Link>
    </section>
  );
}

export default Success;
