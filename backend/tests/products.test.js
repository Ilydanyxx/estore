import request from 'supertest';
import app from '../server.js';
import pool from '../db.js';

let createdProductId;

beforeAll(async () => {
  
});

afterAll(async () => {
  await pool.end(); 
});

describe('Тести маршруту /api/products', () => {
  test('GET /api/products — має повертати масив продуктів', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/products — успішне додавання продукту', async () => {
    const newProduct = {
      title: 'Тестовий товар',
      description: 'Опис тестового товару',
      price: 99.99,
      state: 'Відмінний',
      image1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
      image2: '',
      category: 'Монети'
    };

    const res = await request(app).post('/api/products').send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdProductId = res.body.id;
  });

  test('POST /api/products — помилка при невалідних даних', async () => {
    const invalidProduct = {
      title: '',
      price: -100,
      image1: '',
      state: '',
      category: ''
    };

    const res = await request(app).post('/api/products').send(invalidProduct);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  test('PUT /api/products/:id — оновлення is_hidden', async () => {
    const res = await request(app)
      .put(`/api/products/${createdProductId}`)
      .send({ is_hidden: true });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('is_hidden', true);
  });

  test('DELETE /api/products/:id — видалення продукту', async () => {
    const res = await request(app).delete(`/api/products/${createdProductId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Товар видалено');
  });

  test('DELETE /api/products/:id — повторне видалення має дати 404', async () => {
    const res = await request(app).delete(`/api/products/${createdProductId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Товар не знайдено');
  });
});
