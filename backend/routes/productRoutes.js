import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Отримати всі товари з можливістю фільтрації за категорією
router.get('/', async (req, res) => {
  const { category } = req.query; // отримуємо параметр 'category' з запиту

  let query = 'SELECT * FROM products';
  let values = [];

  if (category && category !== 'all') {
    query += ' WHERE category = $1'; // фільтруємо за категорією, якщо вона вказана
    values = [category];
  }

  query += ' ORDER BY id DESC'; // Сортуємо за id

  try {
    const result = await pool.query(query, values);
    res.json(result.rows); // Повертаємо результат
  } catch (error) {
    console.error('Помилка при отриманні товарів:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Додати новий товар
router.post('/', async (req, res) => {
  const { title, description, price, state, image1, image2 } = req.body;

  if (!title || !price || !image1) {
    return res.status(400).json({ message: 'Заповніть обовʼязкові поля' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (title, description, price, state, image1, image2)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, price, state, image1, image2]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Помилка при додаванні товару:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Видалити товар
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }
    res.status(200).json({ message: 'Товар видалено' });
  } catch (error) {
    console.error('Помилка при видаленні товару:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
