import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrlFront: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrlBack: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;