const linkRouter = require("express").Router();
const dbCon = require("../config/db");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const pathToFfmpeg = require("ffmpeg-static");

const send_data = (data) => {
  let video_id = data.videoId;
  let video_title = data.videoTitle;
  let yt_channel = data.artist;
  let thumbnail = data.thumbnail;
  const sql =
    "INSERT INTO audios (video_id,video_title,yt_channel , thumbnail, likes ,downloads ) VALUES(?,?,?,? ,?,?)";
  dbCon.query(
    sql,
    [video_id, video_title, yt_channel, thumbnail, 0, 0],
    (err, result) => {
      if (err) throw err;
      console.log("Record inderted");
    }
  );
};

const YD = new YoutubeMp3Downloader({
  ffmpegPath: pathToFfmpeg,
  outputPath: "./upload",
  youtubeVideoQuality: "highestaudio",
  queueParallelism: 2,
  progressTimeout: 2000,
  allowWebm: false,
});

YD.on("error", function (error) {
  console.log(error);
});

YD.on("progress", function (progress) {
  // console.log("The information after success ", JSON.stringify(progress));
});

linkRouter.post("/getlinks", (req, res) => {
  let videoId = req.body.link.slice("32");
  dbCon.query(
    `SELECT * FROM Audios WHERE video_id = ? `,
    [videoId],
    (err, result) => {
      if (result.length === 0 || result == undefined || result == null) {
        YD.download(videoId, videoId + ".mp3");
        YD.on("finished", function (err, data) {
          const resObj = {
            title: data.videoTitle,
            author: data.artist,
            downloads: "0",
            likes: "0",
            thumbnail: data.thumbnail,


          };
          res.send(resObj);
          send_data(data);
        });
      } else {
        const response = {
          title: result[0].video_title,
          author: result[0].yt_channel,
          downloads: result[0].downloads,
          likes: result[0].likes,
          thumbnail: result[0].thumbnail,
        };
        res.send(response);
      }
    }
  );
});
module.exports = linkRouter;
