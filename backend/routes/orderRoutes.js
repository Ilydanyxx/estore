// backend/routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js'; // імпортуємо модель товару
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// Підтвердження замовлення та видалення товарів
router.put('/:orderId/confirm', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    if (order.status === 'confirmed') {
      return res.status(400).json({ message: 'Замовлення вже підтверджене' });
    }

    // Підтвердження
    order.status = 'confirmed';
    await order.save();

    const productIds = order.items.map(item => item.product.id);



    if (!productIds || productIds.length === 0) {
      return res.status(400).json({ message: 'У замовленні немає товарів для видалення' });
    }
    
    console.log('IDs товарів для видалення:', productIds);

    const deletedCount = await Product.destroy({
      where: { id: productIds }
    });
    
    console.log('Видалено товарів:', deletedCount);
    
    

    console.log(`Видалено ${deletedCount} товарів`);

    // Надіслати лист адміну
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: 'Підтверджено замовлення!',
      text: `Замовлення №${orderId} підтверджено. Було видалено ${deletedCount} товарів.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json(order);
  } catch (error) {
    console.error('Помилка при підтвердженні замовлення:', error);
    res.status(500).json({ message: 'Помилка сервера при підтвердженні замовлення' });
  }
});





export default router;
