const linkRouter = require("express").Router();
const dbCon = require("../config/db");

const YoutubeMp3Downloader = require("youtube-mp3-downloader");
var pathToFfmpeg = require("ffmpeg-static");


const download_audio = (videoId) =>{

    var YD = new YoutubeMp3Downloader({
    ffmpegPath: pathToFfmpeg,
    outputPath: "./upload",
    youtubeVideoQuality: "highestaudio",
    queueParallelism: 2,
    progressTimeout: 2000,
    allowWebm: false,
  });

  //Download video and save as MP3 file
  YD.download(videoId , videoId + ".mp3");

  YD.on("finished", function (err, data) {
    // console.log(JSON.stringify(data));
    console.log(data);
  });

  YD.on("error", function (error) {
    console.log(error);
  });

  YD.on("progress", function (progress) {
    console.log(JSON.stringify(progress));
  });
}



linkRouter.post("/getlinks", (req ,res)=>{ 
    let videoId = req.body.link.slice("32");

    dbCon.query(`SELECT * FROM Audios WHERE video_id = ? `, [
        videoId
    ], (data , err)=>{
        console.log({data , err})
    })



    // download_audio(videoId)
})
module.exports = linkRouter;
