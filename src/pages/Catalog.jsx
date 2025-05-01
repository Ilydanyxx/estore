import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
  'Німецька імперія',
  'Веймарська республіка',
  'Німеччина до 1871 року'
];

const Catalog = () => {
  const { isAdmin, addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    state: '',
    image1: '',
    image2: '',
    category: categoryOptions[0]
  });

  const fetchProducts = async () => {
    console.log('Запит до сервера з категорією:', selectedCategoryFilter);  // Логування категорії
    const params = selectedCategoryFilter !== 'all' ? { category: selectedCategoryFilter } : {};
    console.log('Запит з параметрами:', params);  // Логування запиту
    try {
      const res = await axios.get('http://localhost:5001/api/products', { params });
      setProducts(res.data);
    } catch (error) {
      console.error('Помилка при завантаженні товарів:', error);
    }
  };
  
  

  useEffect(() => {
    fetchProducts();
  }, [selectedCategoryFilter]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Помилка при видаленні товару:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.state || !newProduct.category) {
      alert('Будь ласка, заповніть усі обов’язкові поля.');
      return;
    }

    const preparedProduct = {
      title: newProduct.title,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      state: newProduct.state,
      category: newProduct.category
    };

    if (newProduct.image1) preparedProduct.image1 = newProduct.image1;
    if (newProduct.image2) preparedProduct.image2 = newProduct.image2;

    try {
      await axios.post('http://localhost:5001/api/products', preparedProduct, {
        headers: { 'Content-Type': 'application/json' }
      });
      setShowAddForm(false);
      setNewProduct({
        title: '',
        description: '',
        price: '',
        state: '',
        image1: '',
        image2: '',
        category: categoryOptions[0]
      });
      fetchProducts();
    } catch (error) {
      console.error('Помилка при додаванні товару:', error.response?.data || error);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct(prev => ({ ...prev, [field]: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const isInCart = cartItems.some(item => item.id === product.id);
      if (!isInCart) {
        addToCart(product);
        await axios.delete(`http://localhost:5001/api/products/${product.id}`);
        fetchProducts();
      }
    } catch (error) {
      console.error('Помилка при додаванні до кошика:', error);
    }
  };

  return (
    <div className="catalog-page">
      <h1>Каталог</h1>

      {/* Фільтр категорії */}
      <label>
        Категорія:{' '}
        <select value={selectedCategoryFilter} onChange={(e) => setSelectedCategoryFilter(e.target.value)}>
          <option value="all">Усі категорії</option>
          {categoryOptions.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      {!isAdmin && (
        <button onClick={() => navigate('/cart')}>Перейти в кошик</button>
      )}

      {isAdmin && (
        <>
          <button onClick={() => setShowAddForm(!showAddForm)}>+ Додати товар</button>
          {showAddForm && (
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Назва"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Опис"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Ціна"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <input
                type="text"
                placeholder="Стан"
                value={newProduct.state}
                onChange={(e) => setNewProduct({ ...newProduct, state: e.target.value })}
              />

              {/* Категорія */}
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input type="file" onChange={(e) => handleFileChange(e, 'image1')} />
              <input type="file" onChange={(e) => handleFileChange(e, 'image2')} />
              <button type="submit">Додати</button>
            </form>
          )}
        </>
      )}

      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image1} alt={product.title} width="150" />
            <h3>{product.title}</h3>
            <p>{product.price} грн</p>
            <p>Стан: {product.state}</p>
            <p>Категорія: {product.category}</p>

            {isAdmin ? (
              <button onClick={() => handleDelete(product.id)}>Видалити</button>
            ) : (
              <button onClick={() => handleAddToCart(product)}>Додати в кошик</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
