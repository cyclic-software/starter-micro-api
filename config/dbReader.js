//// INI FILE UTK DATABASE KEDUA --> hanya untuk data gamelist yang bersifat ReadOnly

// PANGGIL SEQUELIZE NYA
const { Sequelize } = require('sequelize')

// BIKIN VARIABEL UNTUK NYIMPAN CONFIG SEQUELIZE NYA
const sequelizeReader = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_READER_NAME,
    username: process.env.DB_READER_USER,
    password: process.env.DB_READER_PASS,
    dialect: 'postgres',
})

// EXPORTS VARIABEL SEQUELIZE NYA
module.exports = { sequelizeReader }