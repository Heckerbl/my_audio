const express = require("express");
const app = express();
require("dotenv").config();
const dbCon = require("./config/db");
const cors = require("cors");
app.use(express.json({ extented: false }));
app.use(cors());

app.get("/", (req, res) => {
res.send("homepage");
});

//create server and listen to the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on ${port}`);
});

//using routes
app.use("/api", require("./Routes/link"));
