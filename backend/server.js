import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import sequelize from './db.js';

dotenv.config();
const app = express();

// ДУЖЕ ВАЖЛИВО: cors ДО ВСІХ route!
app.use(cors({
  origin: 'http://localhost:5173',   // твій фронтенд
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Щоб парсити JSON body
app.use(express.json());

// Твої маршрути
app.use('/api/products', productRoutes);

// Запуск сервера
const PORT = 5001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
  });
});