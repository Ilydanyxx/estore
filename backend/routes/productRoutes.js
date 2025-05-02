// backend/routes/productRoutes.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Отримати всі товари з фільтрацією та сортуванням
router.get('/', async (req, res) => {
  const { category, sort } = req.query;

  let query = 'SELECT * FROM products';
  let values = [];
  let whereClause = '';

  if (category && category !== 'all') {
    whereClause = ' WHERE category = $1';
    values.push(category);
  }

  // Додаємо сортування
  let orderBy = ' ORDER BY id DESC';

  if (sort === 'price_asc') {
    orderBy = ' ORDER BY price ASC';
  } else if (sort === 'price_desc') {
    orderBy = ' ORDER BY price DESC';
  } else if (sort === 'state_asc') {
    orderBy = `
      ORDER BY
        CAST(regexp_replace(state, '[^0-9]', '', 'g') AS INTEGER) ASC,
        CASE
          WHEN state LIKE '%+' THEN 1
          WHEN state ~ '^[0-9]$' THEN 0
          WHEN state LIKE '%−' OR state LIKE '%-' THEN -1
          ELSE 0
        END ASC
    `;
  } else if (sort === 'state_desc') {
    orderBy = `
      ORDER BY
        CAST(regexp_replace(state, '[^0-9]', '', 'g') AS INTEGER) DESC,
        CASE
          WHEN state LIKE '%+' THEN 1
          WHEN state ~ '^[0-9]$' THEN 0
          WHEN state LIKE '%−' OR state LIKE '%-' THEN -1
          ELSE 0
        END DESC
    `;
  }

  const finalQuery = query + whereClause + orderBy;

  try {
    const result = await pool.query(finalQuery, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Помилка при отриманні товарів:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Додати новий товар
router.post('/', async (req, res) => {
  const { title, description, price, state, image1, image2, category } = req.body;

  if (!title || !price || !image1 || !state || !category) {
    return res.status(400).json({ message: 'Заповніть обовʼязкові поля' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (title, description, price, state, image1, image2, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, price, state, image1, image2, category]
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
