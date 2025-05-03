import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="image-container">
          <img
            src={product.imageFront}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h3 className="text-xl font-serif text-center text-primary mt-4">
          {product.name}
        </h3>
        <p className="text-sm text-muted text-center">Ціна: {product.price} грн</p>
        <p className="text-sm text-muted text-center mb-4">Стан: {product.condition}</p>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-6 py-2 rounded-xl text-sm transition hover:opacity-90 hover:scale-105"
      >
        Додати в кошик
      </button>
    </div>
  );
};

export default ProductCard;
