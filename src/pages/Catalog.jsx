import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Catalog = () => {
  const { isAdmin } = useCart();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    state: '',
    image1: '',
    image2: ''
  });

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5001/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/api/products/${id}`);
    fetchProducts();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/products', newProduct);
    setShowAddForm(false);
    fetchProducts();
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

  return (
    <div className="catalog-page">
      <h1>Каталог</h1>
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
            {isAdmin && (
              <button onClick={() => handleDelete(product.id)}>Видалити</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;