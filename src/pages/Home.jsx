import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <section className="container mx-auto px-4 py-10">
      {/* Блок баннера */}
      <motion.div
        className="bg-primary text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Новые коллекции уже здесь</h1>
          <p className="mb-6">Открой для себя лучшие модели сезона в нашем магазине.</p>
          <Link
            to="/catalog"
            className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Перейти в каталог
          </Link>
        </div>
        <img
          src=""
          alt="Hero Banner"
          className="rounded-xl w-full md:w-1/2 object-cover"
        />
      </motion.div>

      {/* Дополнительный раздел */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Почему выбирают нас?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Мы предлагаем только качественную продукцию, быструю доставку и лучший сервис.
        </p>
      </div>
    </section>
  );
}

export default Home;
