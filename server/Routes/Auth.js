const authRoute = require("express").Router();
const dbCon = require("../config/db");

//post route for the user auth
authRoute.post("/auth", (req, res) => {
  const { name, email, imageUrl, googleId } = req.body;
  let defaultPlayList = `${name.split(" ")[0]}'s Playlist`;
  dbCon.query(
    "SELECT * FROM user_data WHERE google_id = ?",
    [googleId],
    (err, result) => {
      if (result.length == 0 || result == null || result == undefined) {
        let playlistName = "My playlist";
        const sql =
          "INSERT INTO user_data  (user_name,user_email,user_photo,google_id,playlist_name) VALUES (?,?,?,?,?)";
        dbCon.query(
          sql,
          [name, email, imageUrl, googleId, playlistName],
          (err, result) => {
            if (err) throw err;
            res.status(200).json({
              message: "User Registered ",
            });
          }
        );
      } else {
        res.status(202).json({
          message: "User is Loged in",
        });
      }
    }
  );
});

// send user data to client if user is loged in
authRoute.post("/getuserdata", (req, res) => {
  const cookie = req.body.cookie;
  dbCon.query(
    "SELECT * from user_data Where google_id=? ",
    [cookie],
    (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    }
  );
});

//post request to update the playlist
authRoute.post("/updatePlaylistname", (req, res) => {
  const { newPlaylistName, cookie } = req.body;
  dbCon.query(
    "UPDATE user_data SET playlist_name = ? WHERE google_id=?",
    [newPlaylistName, cookie],
    (err, result) => {
      if (err) {
        res.status(404).json({
          message: "Could not change name !",
        });
      } else {
        res.status(200).json({
          message: "Changed",
        });
      }
    }
  );
});
module.exports = authRoute;
