const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), unique: true, allowNull: false, validate: { isEmail: true } },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM('student','tutor','admin'), defaultValue: 'student' }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};
