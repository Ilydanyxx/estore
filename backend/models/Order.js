import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Order = sequelize.define('Order', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  viber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telegram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

export default Order;