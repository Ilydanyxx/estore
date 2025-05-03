import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../api/products';

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Товар не знайдений
      </div>
    );
  }

  return (
    <div className="product-detail">
      <h1 className="text-4xl font-serif text-center text-primary mb-6">
        {product.name}
      </h1>
      <p className="text-lg text-center text-gray-600 mb-2">
        Ціна: <span className="font-medium">{product.price} грн</span>
      </p>
      <p className="text-center text-sm text-gray-500">
        Період: {product.category} | Стан: {product.condition} | Область: {product.area}
      </p>

      <div className="image-container my-10">
        <img
          src={product.imageFront}
          alt={`${product.name} - Front`}
          className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
        <img
          src={product.imageBack}
          alt={`${product.name} - Back`}
          className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>

      <button
        onClick={() => addToCart(product)}
        className="block mx-auto bg-accent text-white text-lg px-6 py-3 rounded-xl transition hover:scale-105 hover:bg-emerald-600"
      >
        Додати в кошик
      </button>

      <div className="details mt-14 space-x-6 flex justify-between">
        <div className="w-1/3 bg-light p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-center mb-2">Деталі</h2>
          <p>Рік випуску: {product.year}</p>
          <p>Матеріал: {product.material}</p>
        </div>

        <div className="w-1/3 bg-light p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-center mb-2">Про товар</h2>
          <p className="text-sm text-gray-700">
            Цей товар є частиною колекції монет, що випускались в різні історичні періоди...
          </p>
        </div>

        <div className="w-1/3 bg-light p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-center mb-2">Опис</h2>
          <p className="text-sm text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
