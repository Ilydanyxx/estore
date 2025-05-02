import { Op, Sequelize } from 'sequelize';
import Product from '../models/Product.js';

const parseState = (stateString) => {
  if (!stateString) return 0;
  const base = parseInt(stateString);
  if (isNaN(base)) return 0;
  if (stateString.includes('+')) return base + 0.3;
  if (stateString.includes('−') || stateString.includes('-')) return base - 0.3;
  return base;
};

export const getProducts = async (req, res) => {
  try {
    console.log('Отримано параметри запиту:', req.query);
    const { category, sortBy, sortOrder } = req.query;

    const whereClause = {
      is_hidden: false, // Завжди перевіряємо is_hidden
      ...(category && category !== 'all' ? { category } : {}) // Додаємо умову для категорії, якщо вона вказана
    };
    

    let products = await Product.findAll({ where: whereClause });

    // Сортування
    if (sortBy === 'price') {
      products.sort((a, b) => {
        const aPrice = parseFloat(a.price);
        const bPrice = parseFloat(b.price);
        return sortOrder === 'desc' ? bPrice - aPrice : aPrice - bPrice;
      });
    } else if (sortBy === 'state') {
      products.sort((a, b) => {
        const aState = parseState(a.state);
        const bState = parseState(b.state);
        return sortOrder === 'desc' ? bState - aState : aState - bState;
      });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні товарів' });
  }
};
