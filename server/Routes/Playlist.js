const playlist = require("express").Router();
const dbCon = require("../config/db");

playlist.post("/addtoplaylist", (req, res) => {
  const { cookie, audio_id } = req.body;
  dbCon.query(
    "SELECT * from playlist WHERE user_id=? AND audio_id=?",
    [cookie, audio_id],
    (err, result) => {
      if (result.length == 0) {
        //the music in not in playlist
        const sql = "INSERT INTO playlist (user_id,audio_id) VALUES(?,?)";
        dbCon.query(sql, [cookie, audio_id], (err, result) => {
          if (err) {
            res.status(404).json({
              message: "Failed while Adding",
            });
          }
          res.status(200).json({
            message: "Successfully added to the playlist",
          });
        });
      } else {
        //this audio is already in the playlist
        res.status(201).json({
          message: "Audio is already in your playlist",
        });
      }
    }
  );
});

playlist.post("/getplaylistSongs", (req, res) => {
  const { cookie } = req.body;
  const sql = "SELECT * FROM playlist WHERE user_id = ?";
  dbCon.query(sql, [cookie], (err, result) => {
    if (err) {
      res.status(400).json({
        message: "failed to get playlist details ",
      });
    } else {
      let playlistSongs = [];
      result.forEach((element, index) => {
        const audio_id = element.audio_id;
        dbCon.query(
          "SELECT * FROM audios where video_id = ?",
          [audio_id],
          (err, song) => {
            if (err) {
              res.status(400).json({
                message: "failed to get music",
              });
            } else {
              playlistSongs.push(song[0]);
            }
          }
        );
      });

      setTimeout(() => {
        res.status(200).json({
          playlist: playlistSongs,
        });
      }, 1000);
    }
  });
});
 
module.exports = playlist;
