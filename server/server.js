const express = require('express')
const app = express()
require('dotenv').config()
const dbCon = require("./config/db")
app.use(express.json({ extented: false }));

app.get('/', (req, res) => {
    res.send("Hello")
})
//create server and listen to the server 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Backend running on ${port}`)
})

 

