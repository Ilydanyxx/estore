import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image1: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image2: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Product;