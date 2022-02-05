const mysql = require('mysql');
require("dotenv").config();

const dbCon = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
})

dbCon.connect((err) => {
    if (err) throw err
    console.log("Connected to the database");
})

module.exports = dbCon;