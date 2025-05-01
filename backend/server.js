// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Маршрути
app.use('/api/products', productRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
