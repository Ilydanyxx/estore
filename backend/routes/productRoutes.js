import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Отримати всі товари
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Додати товар
router.post('/', async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
});

// Оновити товар
router.put('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.update(req.body);
    res.json(product);
  } else {
    res.status(404).json({ message: 'Товар не знайдено' });
  }
});

// Видалити товар
router.delete('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.json({ message: 'Товар видалено' });
  } else {
    res.status(404).json({ message: 'Товар не знайдено' });
  }
});

export default router;