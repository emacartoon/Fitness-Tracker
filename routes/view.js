const router = require("express").Router();
const path = require("path");
// const viewDir = path.join(__dirname, "./views")

router.get("/", function(req, res){
    res.sendFile(path.join("index.html"));
});

router.get("/exercise", function(req, res){
    res.sendFile(path.join("exercise.html"));
});

router.get("/stats", function(req, res){
    res.sendFile(path.join("stats.html"));
});

module.exports = router;