const playlist = require("express").Router();
const dbCon = require("../config/db");

playlist.post("/addtoplaylist", (req, res) => {
    const { cookie, audio_id } = req.body;
    dbCon.query("SELECT * from playlist WHERE user_id=? AND audio_id=?", [cookie, audio_id], (err, result) => {
        console.log('result', result);
        if (result.length == 0) {
            //the music in not in playlist
            const sql =
                "INSERT INTO playlist (user_id,audio_id) VALUES(?,?)";
            dbCon.query(sql, [cookie, audio_id], (err, result) => {
                if (err) {
                    res.status(404).json({
                        message: "Failed while Adding"
                    })

                }
                res.status(200).json({
                    message: "Successfully added to the playlist"
                })

            })
        } else {
            //this audio is already in the playlist 
            res.status(201).json({
                message: "Audio is already in your playlist"
            })

        }
    })






})



module.exports = playlist;
