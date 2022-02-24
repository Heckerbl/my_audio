const linkRouter = require("express").Router();
const dbCon = require("../config/db");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const pathToFfmpeg = require("ffmpeg-static");

// function which stores the clip info to database
const send_data = (data) => {
  let video_id = data.videoId;
  let video_title = data.videoTitle;
  let yt_channel = data.artist;
  let thumbnail = data.thumbnail;

  const sql =
    "INSERT INTO audios (video_id,video_title,yt_channel , thumbnail, likes ,downloads   ) VALUES(?,?,?,? ,?,?)";
  dbCon.query(
    sql,
    [video_id, video_title, yt_channel, thumbnail, 0, 0],
    (err, result) => {
      if (err) throw err;
    }
  );
};

// instance that extract the .mp3 file from URL
const YD = new YoutubeMp3Downloader({
  ffmpegPath: pathToFfmpeg,
  outputPath: "./upload",
  youtubeVideoQuality: "highestaudio",
  queueParallelism: 2,
  progressTimeout: 2000,
  allowWebm: false,
});

// catch the URL sent from the client.
linkRouter.post("/getlinks", (req, res) => {
  let videoId = req.body.link;
  dbCon.query(
    `SELECT * FROM audios WHERE video_id = ? `,
    [videoId],
    (err, result) => {

      if (result.length === 0 || result == undefined || result == null) {
        YD.download(videoId, videoId + ".mp3");

        YD.on("finished", function (err, data) {
          console.log(err)
          const resObj = {
            title: data.videoTitle,
            author: data.artist,
            downloads: 0,
            likes: 0,
            thumbnail: data.thumbnail,
            audio_id: videoId,
          };
          res.send(resObj);
          send_data(data);
        });
        YD.on("error", function (error) {
          console.log({ error });
          res.status(500).json({
            message: "Couldnot process the video !",
          });
        });
      } else {
        const response = {

          title: result[0].video_title,
          author: result[0].yt_channel,
          downloads: result[0].downloads,
          likes: result[0].likes,
          thumbnail: result[0].thumbnail,
          audio_id: result[0].video_id,
        };
        res.send(response);
      }
    }
  );
});
module.exports = linkRouter;
