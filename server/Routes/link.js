const linkRouter = require("express").Router();

linkRouter.post("/getlinks", async(req, res) => {
    console.log("hellooo");
});
module.exports = linkRouter;
