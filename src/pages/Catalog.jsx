import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';  // Для навігації на сторінку товару
import products from '../api/products';

const Catalog = () => {
  const { addToCart } = useContext(CartContext);

  const [sortOrderPrice, setSortOrderPrice] = useState('asc');
  const [sortOrderCondition, setSortOrderCondition] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('all');

  let sortedProducts = [...products];

  // Сортування за ціною
  if (sortOrderPrice === 'asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrderPrice === 'desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Сортування за станом
  const conditionOrder = {
    "Добрий": 1,
    "Середній": 2,
    "Поганий": 3,
  };

  if (sortOrderCondition === 'asc') {
    sortedProducts.sort((a, b) => conditionOrder[a.condition] - conditionOrder[b.condition]);
  } else if (sortOrderCondition === 'desc') {
    sortedProducts.sort((a, b) => conditionOrder[b.condition] - conditionOrder[a.condition]);
  }

  // Фільтрація за категорією
  if (filterCategory !== 'all') {
    sortedProducts = sortedProducts.filter(
      (p) => p.category === filterCategory
    );
  }

  return (
    <div className="catalog">
      <div className="filters">
        {/* Сортування за ціною */}
        <select onChange={(e) => setSortOrderPrice(e.target.value)} value={sortOrderPrice}>
          <option value="asc">Ціна за зростанням</option>
          <option value="desc">Ціна за спаданням</option>
        </select>

        {/* Сортування за станом */}
        <select onChange={(e) => setSortOrderCondition(e.target.value)} value={sortOrderCondition}>
          <option value="asc">Стан (від найкращого до найгіршого)</option>
          <option value="desc">Стан (від найгіршого до найкращого)</option>
        </select>

        {/* Фільтрація за категорією */}
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
          <option value="all">Всі категорії</option>
          <option value="Німецька імперія">Німецька імперія</option>
          <option value="Веймарська республіка">Веймарська республіка</option>
          <option value="Німеччина до 1871 року">Німеччина до 1871 року</option>
        </select>
      </div>

      <div className="products">
        {sortedProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-link">
            <ProductCard product={product} addToCart={addToCart} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;