import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  const product = {
    id,
    name: "Назва товару",
    description: "Це розкішний опис товару. Тут можна розповісти про особливості, матеріали, розміри тощо.",
    price: "999₴",
    images: [
      "/images/product1.jpg",
      "/images/product2.jpg",
    ]
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 bg-light dark:bg-dark text-dark dark:text-white rounded-2xl shadow-xl font-sans">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">{product.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Фото ${index + 1}`}
            className="w-full h-96 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
        {product.description}
      </p>

      <div className="text-2xl font-medium text-accent text-center mb-6">
        {product.price}
      </div>

      <div className="flex justify-center">
        <button className="bg-accent hover:bg-emerald-700 text-white text-lg px-6 py-3 rounded-xl transition duration-300 shadow-md hover:scale-105">
          Додати в кошик
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
