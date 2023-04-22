const { DataTypes } = require('sequelize');
const db = require('../database/config');

const User = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'disabled'),
    allowNull: false,
    defaultValue: 'available',
  },
});

module.exports = User;
