const linkRouter = require("express").Router();

linkRouter.get("/getlinks", (req ,res)=>{ 
    res.send(req.body);
})
module.exports = linkRouter;