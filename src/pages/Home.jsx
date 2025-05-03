import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <section className="container mx-auto px-4 py-10">
      {/* Банер */}
      <motion.div
        className="bg-yellow-500 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Нова колекція вже доступна</h1>
          <p className="mb-6">
            Відкрийте для себе рідкісні монети та ексклюзивні нумізматичні позиції в нашому каталозі.
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-white text-yellow-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Перейти до каталогу
          </Link>
        </div>
        <img
          src="/assets/images/hero-banner.jpg"
          alt="Колекційні монети"
          className="rounded-xl w-full md:w-1/2 object-cover"
        />
      </motion.div>

      {/* Чому обирають нас */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Чому обирають Numizmatica?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Ми пропонуємо автентичні монети, професійне обслуговування та швидку доставку по всій Україні.
        </p>
      </div>

      {/* Топ найрідкісніших монет */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Найрідкісніші монети 2025 року</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Монета «Гетьман Мазепа»",
              price: "₴7,200",
              img: "/assets/images/rare1.jpg",
              link: "/product/rare-1"
            },
            {
              title: "Пам’ятна монета «Скіфське золото»",
              price: "₴6,800",
              img: "/assets/images/rare2.jpg",
              link: "/product/rare-2"
            },
            {
              title: "Монета «Київська Русь – 1000 років»",
              price: "₴5,990",
              img: "/assets/images/rare3.jpg",
              link: "/product/rare-3"
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4 text-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-yellow-600 font-bold text-xl mb-2">{item.price}</p>
              <Link to={item.link} className="text-yellow-600 hover:underline">
                Детальніше
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Топ найдорожчих монет */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Топ-3 найдорожчі монети в наявності</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Інвестмонета «Золото України»",
              price: "₴25,000",
              img: "/assets/images/expensive1.jpg",
              link: "/product/expensive-1"
            },
            {
              title: "Пам’ятна монета «UNESCO – Софія Київська»",
              price: "₴18,900",
              img: "/assets/images/expensive2.jpg",
              link: "/product/expensive-2"
            },
            {
              title: "Ювілейна монета «30 років Незалежності»",
              price: "₴15,750",
              img: "/assets/images/expensive3.jpg",
              link: "/product/expensive-3"
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-4 text-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-yellow-600 font-bold text-xl mb-2">{item.price}</p>
              <Link to={item.link} className="text-yellow-600 hover:underline">
                Детальніше
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
