const express = require("express");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const path = require("path")
var pathToFfmpeg = require('ffmpeg-static');
const app = express();
require("dotenv").config();
const dbCon = require("./config/db");
const cors = require("cors");
app.use(express.json({ extented: false }));
app.use(cors())



// app.use("/api", require("./Routes/link"))
app.get("/", (req, res) => {
    res.json({
        status: true,
        data: {
            id: 1,
            name: "Youtube video"
        }
    })

    //Configure YoutubeMp3Downloader with your settings
    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": pathToFfmpeg,
        "outputPath": "./upload",
        "youtubeVideoQuality": "highestaudio",
        "queueParallelism": 2,
        "progressTimeout": 2000,
        "allowWebm": false
    });

    //Download video and save as MP3 file
    YD.download("6iFS664iBXs");

    YD.on("finished", function (err, data) {
        // console.log(JSON.stringify(data));
        console.log("The file  moved succesfully !!");
    });

    YD.on("error", function (error) {
        console.log("Something went wrong ");
    });

    YD.on("progress", function (progress) {
        console.log(JSON.stringify(progress));
    });

})

//create server and listen to the server 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Backend running on ${port}`)
})
