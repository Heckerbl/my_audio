const authRoute = require("express").Router();
const dbCon = require("../config/db");

authRoute.post("/auth", (req, res) => {
    const { name, email, imageUrl, googleId } = req.body;
    console.log(name);
    dbCon.query(
        "SELECT * FROM user_data WHERE google_id = ?",
        [googleId],
        (err, result) => {
            if (result.length == 0 || result == null || result == undefined) {
                //insert
                const sql =
                    "INSERT INTO user_data  (user_name,user_email,user_photo,google_id) VALUES (?,?,?,?)";
                dbCon.query(sql, [name, email, imageUrl, googleId], (err, result) => {
                    if (err) throw err;
                    console.log("inserd");
                    res.status(200).json({
                        message: "User Registered "
                    })
                });
            } else {
                console.log("login");

                res.status(202).json({
                    message: "User is Loged in",
                });
            }
        }
    );
});

authRoute.post("/getuserdata", (req, res) => {
    const cookie = req.body.cookie;
    dbCon.query("SELECT * from user_data Where google_id=? ", [cookie], (err, result) => {
        if (err) throw err;
        res.status(200).json(result)
    })

})
module.exports = authRoute;
