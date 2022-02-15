const express = require("express");
const app = express();
require("dotenv").config();
const dbCon = require("./config/db");
const cors = require("cors");
app.use(express.json({ extented: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("homepage");
});

//create server and listen to the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on ${port}`);
});

// setting variables for file path and status
var fs = require("fs"),
  path = require("path");

app.get("/download/:id", (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname + "/upload/", id + ".mp3");
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size,
  });
  var readStream = fs.createReadStream(filePath);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
});

//using routes
app.use("/api", require("./Routes/link"));
