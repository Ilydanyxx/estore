import Product from '../models/Product.js';

// Отримати всі товари (з підтримкою фільтрації за категорією)
export const getProducts = async (req, res) => {
  try {
    console.log('Отримано параметри запиту:', req.query);  // Логування всіх параметрів запиту
    const { category } = req.query;
    const whereClause = category && category !== 'all' ? { category } : {};

    const products = await Product.findAll({ where: whereClause });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні товарів' });
  }
};



// Додати товар
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, state, image1, image2, category } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      state,
      image1,
      image2,
      category
    });

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
