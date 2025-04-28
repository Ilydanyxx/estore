import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../api/products';

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Товар не знайдений</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>Ціна: {product.price} грн</p>
      <p>Період: {product.category}</p>
      <p>Стан: {product.condition}</p>
      <p>Область: {product.area}</p>

      <div className="image-container">
        <img
          src={product.imageFront}
          alt={`${product.name} - Front`}
        />
        <img
          src={product.imageBack}
          alt={`${product.name} - Back`}
        />
      </div>

      <button>Додати в кошик</button>

      <div className="details">
        <div>
          <h2>Деталі</h2>
          <p>Рік випуску: {product.year}</p>
          <p>Матеріал: {product.material}</p>
        </div>
        <div>
          <h2>Про товар</h2>
          <p>Цей товар є частиною колекції монет, що випускались в різні історичні періоди...</p>
        </div>
        <div>
          <h2>Опис</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;