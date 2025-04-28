import express from 'express';
import Order from '../models/Order.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Створити нове замовлення
router.post('/', async (req, res) => {
  const order = await Order.create(req.body);

  // Надіслати лист адміністратору
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
    subject: 'Нове замовлення!',
    text: `Замовлення від ${order.customerName}:\n\n${JSON.stringify(order.items, null, 2)}\n\nКонтакти:\nТелефон: ${order.customerPhone}\nEmail: ${order.customerEmail}\nViber: ${order.viber}\nTelegram: ${order.telegram}\nWhatsapp: ${order.whatsapp}`,
  };

  await transporter.sendMail(mailOptions);

  res.status(201).json(order);
});

export default router;