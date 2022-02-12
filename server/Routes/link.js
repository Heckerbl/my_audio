const linkRouter = require("express").Router();
const dbCon = require("../config/db");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const pathToFfmpeg = require("ffmpeg-static");
let { const { videoTitle, videoId, thumbnail, author } = data;, videoId, thumbnail, author } = data;
const download_audio = (videoId) => {
  const YD = new YoutubeMp3Downloader({
    ffmpegPath: pathToFfmpeg,
    outputPath: "./upload",
    youtubeVideoQuality: "highestaudio",
    queueParallelism: 2,
    progressTimeout: 2000,
    allowWebm: false,
  });
  YD.download(videoId, videoId + ".mp3");
  YD.on("finished", function (err, data) {
    // console.log(JSON.stringify(data));
    

  });

  YD.on("error", function (error) {
    console.log("there is an error");
  });

  YD.on("progress", function (progress) {
    // console.log("The information after success ", JSON.stringify(progress));
  });

};


linkRouter.post("/getlinks", (req, res) => {
  let videoId = req.body.link.slice("32");
  dbCon.query(
    `SELECT * FROM Audios WHERE video_id = ? `,
    [videoId],
    (err, result) => {
      if (result.length === 0) {
        download_audio(videoId, videoId);
        const sql =
          "INSERT INTO audios (video_id,video_title,yt_channel) VALUES(?,?,?)";
        dbCon.query(sql, [id, title, owner], (err, result) => {
          if (err) throw err;
          console.log("Record inderted");
        })
      } else {
        console.log("data in the database already exist !!");
      }
    }
  );
});
module.exports = linkRouter;
