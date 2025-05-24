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
          src="/src/assets/images/photo_2025-04-03_16-33-13.jpg"
          alt="Колекційні монети"
          className="rounded-xl w-full md:w-1/2 object-cover"
        />
      </motion.div>

      {/* Чому обирають нас */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Чому обирають Numizmatica?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
        Колекціонування монет — це не просто хобі. Це подорож у часі, можливість доторкнутися до історії та зберегти її у власних руках. У нашому інтернет-магазині ви знайдете ретельно відібрані екземпляри — від пам’ятних монет Німецької імперії до рідкісних випусків Європи та світу.
        </p>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
        Ми віримо, що кожна монета — це більше, ніж метал. Це — частина культури, мистецтва, подій і людей. Саме тому Numizmatica пропонує тільки перевірені та автентичні монети, з гарантованою якістю і прозорим походженням.
        </p>
      </div>

      {/* Топ найрідкісніших монет */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Найрідкісніші монети 2025 року</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Талер 1855 Візит до монетного двору короля Йоганна",
              price: "60$",
              img: "/src/assets/images/photo_2025-05-09_23-44-20.jpg",
              link: "/product/rare-1"
            },
            {
              title: "2 талери 1844 Баден ",
              price: "85$",
              img: "/src/assets/images/photo_2025-05-09_23-44-59.jpg",
              link: "/product/rare-2"
            },
            {
              title: "3 рейхсмарки 1927 450-та річниця - Тюбінгенський університет",
              price: "₴5,990",
              img: "/src/assets/images/photo_2024-10-14_15-38-32.jpg",
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

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Інвестуйте в надійне</h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
        Монети — це не лише краса та історія. Це ще й розумна інвестиція. Історичні монети з роками тільки зростають у ціні, зберігаючи свою цінність навіть у часи економічної нестабільності. На відміну від багатьох інших активів, вони не вимагають складного обслуговування, зберігаються компактно та мають стабільний попит серед колекціонерів і інвесторів у всьому світі.
        </p>
      </div>

      {/* Топ найдорожчих монет */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Топ-3 найдорожчі монети в наявності</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Талер 1554-1557 Саксонія",
              price: "85$",
              img: "/src/assets/images/photo_2024-10-14_15-38-32.jpg",
              link: "/product/expensive-1"
            },
            {
              title: "3 рейхсмарки 1927 450-та річниця - Тюбінгенський університет",
              price: "₴1420",
              img: "/src/assets/images/photo_2024-11-17_16-17-21.jpg",
              link: "/product/expensive-2"
            },
            {
              title: "Талер 1601 Саксонія ",
              price: "50$",
              img: "/src/assets/images/photo_2024-10-14_15-47-38.jpg",
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
