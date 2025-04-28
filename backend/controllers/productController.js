import Product from '../models/Product.js';

// Отримати всі товари
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні товарів' });
  }
};

// Додати товар
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, state, image1, image2 } = req.body;
    const product = await Product.create({ title, description, price, state, image1, image2 });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при створенні товару' });
  }
};

// Видалити товар
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Товар не знайдено' });
    }
    await product.destroy();
    res.json({ message: 'Товар видалено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при видаленні товару' });
  }
};