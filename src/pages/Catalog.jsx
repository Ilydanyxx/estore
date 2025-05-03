import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
  'Німецька імперія',
  'Веймарська республіка',
  'Німеччина до 1871 року'
];

const sortOptions = [
  { value: 'price_asc', label: 'Ціна: від найменшої' },
  { value: 'price_desc', label: 'Ціна: від найбільшої' },
  { value: 'state_asc', label: 'Стан: від найгіршого' },
  { value: 'state_desc', label: 'Стан: від найкращого' }
];

const Catalog = () => {
  const { isAdmin, addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('');

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
    try {
      const params = {};
      if (selectedCategoryFilter !== 'all') params.category = selectedCategoryFilter;
      if (selectedSort) params.sort = selectedSort;

      const res = await axios.get(`http://localhost:5001/api/products`, { params });
      setProducts(res.data);
    } catch (error) {
      console.error('Помилка при завантаженні товарів:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategoryFilter, selectedSort]);

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
    const { title, description, price, state, category } = newProduct;

    if (!title || !description || !price || !state || !category) {
      alert('Заповніть усі поля.');
      return;
    }

    const prepared = {
      title,
      description,
      price: parseFloat(price),
      state,
      category,
      image1: newProduct.image1,
      image2: newProduct.image2
    };

    try {
      await axios.post('http://localhost:5001/api/products', prepared, {
        headers: { 'Content-Type': 'application/json' }
      });
      setShowAddForm(false);
      setNewProduct({ title: '', description: '', price: '', state: '', image1: '', image2: '', category: categoryOptions[0] });
      fetchProducts();
    } catch (error) {
      console.error('Помилка при додаванні товару:', error.response?.data || error);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct(prev => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = async (product) => {
    try {
      const alreadyInCart = cartItems.some(item => item.id === product.id);
      if (!alreadyInCart) {
        await axios.put(`http://localhost:5001/api/products/${product.id}`, { is_hidden: true });
        addToCart(product);
        fetchProducts();
      }
    } catch (error) {
      console.error('Помилка при додаванні в кошик:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold font-serif text-dark">Каталог</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          >
            <option value="all">Усі категорії</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="">Без сортування</option>
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {!isAdmin && (
            <button
              onClick={() => navigate('/cart')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-xl transition"
            >
              Кошик
            </button>
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="mb-8">
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Скасувати' : '+ Додати товар'}
          </button>

          {showAddForm && (
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-gray-100 p-4 rounded-xl">
              <input type="text" placeholder="Назва" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} className="input" />
              <input type="text" placeholder="Опис" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="input" />
              <input type="number" placeholder="Ціна" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="input" />
              <input type="text" placeholder="Стан (наприклад, 3+)" value={newProduct.state} onChange={(e) => setNewProduct({ ...newProduct, state: e.target.value })} className="input" />
              <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="input">
                {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image1')} className="input" />
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image2')} className="input" />
              <button type="submit" className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-dark col-span-full">Додати</button>
            </form>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products
          .filter(product => !cartItems.some(item => item.id === product.id))
          .map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
              {product.image1 && (
                <img
                  src={product.image1}
                  alt={product.title}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{product.description}</p>
              <p className="text-base font-medium">Ціна: {product.price} грн</p>
              <p className="text-sm text-gray-500">Стан: {product.state}</p>
              <p className="text-sm text-gray-500 mb-3">Категорія: {product.category}</p>

              {isAdmin ? (
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Видалити
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                >
                  У кошик
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
