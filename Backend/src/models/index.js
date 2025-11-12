const { Sequelize } = require('sequelize');
require('dotenv').config();
db.User = require('./user')(sequelize);


const useDatabaseUrl = !!process.env.DATABASE_URL;

const sequelize = useDatabaseUrl
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectOptions: {
        // PlanetScale may require SSL object; if your DATABASE_URL already contains ssl param you can omit this
        // For PlanetScale you may need: ssl: { rejectUnauthorized: true }
      }
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql'  
    });

const db = { sequelize, Sequelize: Sequelize };

db.User = require('./user')(sequelize);

module.exports = db;
