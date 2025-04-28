import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Ціна: {product.price} грн</p>
      <p>Стан: {product.condition}</p>
      
      <div className="image-container">
        <img
          src={product.imageFront}
          alt={product.name}
        />
      </div>

      <button onClick={() => addToCart(product)}>Додати в кошик</button>
    </div>
  );
};

export default ProductCard;