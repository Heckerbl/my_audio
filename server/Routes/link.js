const linkRouter = require("express").Router();

linkRouter.post("/getlinks", (req ,res)=>{
    console.log(req.body);
    res.send(req.body);
})
module.exports = linkRouter;
