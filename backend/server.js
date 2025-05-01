import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
// Збільшуємо ліміт до 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Маршрути
app.use('/api/products', productRoutes);

// Запуск сервера
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});