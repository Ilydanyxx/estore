// src/pages/Catalog.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import products from '../api/products';

const Catalog = () => {
  const { addToCart } = useContext(CartContext);

  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('all');

  let filteredProducts = [...products];

  if (filterCategory !== 'all') {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === filterCategory
    );
  }

  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="catalog">
      <div className="filters">
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ціна за зростанням</option>
          <option value="desc">Ціна за спаданням</option>
        </select>

        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="all">Всі категорії</option>
          <option value="coins">Монети</option>
          <option value="notes">Банкноти</option>
        </select>
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;