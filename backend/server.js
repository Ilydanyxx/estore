import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Підключення до бази даних
sequelize.sync().then(() => {
  console.log('База даних підключена');
}).catch((err) => {
  console.error('Помилка підключення до бази:', err);
});

// Маршрути
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});