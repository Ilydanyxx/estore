import { useParams } from 'react-router-dom';
import products from '../api/products';

function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-10">Товар не найден</div>;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Изображение товара */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-2xl"
          />
        </div>

        {/* Информация о товаре */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
          <p className="text-xl text-primary font-bold mb-6">{product.price} ₽</p>
          <p className="text-lg mb-6">
            Мы предлагаем качественные и стильные кроссовки от ведущих брендов. Превосходный комфорт и стиль!
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
            Добавить в корзину
          </button>
        </div>
      </div>
    </section>
  );
}

export default Product;
