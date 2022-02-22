const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const config = require("./config/db");

// setting app
app.use(express.json({ extented: false }));
// app.use(
//   cors({
//     origin: "https://yodio.netlify.app/",
//   })
// );

//create server and listen to the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on ${port}`);
});

// setting variables for file path and status
var fs = require("fs"),
  path = require("path");

// downloading the file
app.get("/download/:id", (req, res) => {
  const filePath = path.join(__dirname + "/upload/", req.params.id + ".mp3");
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size,
  });
  var readStream = fs.createReadStream(filePath);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
});

// getting musics
app.use("/api/getsongs/", express.static(path.join(__dirname, "upload")));

//using routes
app.use("/api", require("./Routes/link"));
app.use("/api", require("./Routes/Playlist"));
app.use("/api", require("./Routes/Auth"));
