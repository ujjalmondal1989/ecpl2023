const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const connection = require("./database");
const controller = require("./controllers/player.controller");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(true);
});

app.post("/api/addPlayer", controller.upload);
app.get("/api/players", controller.getPlayers);
app.get("/api/player/:id", controller.getAPlayer);
app.post("/api/update/player/:id", controller.updatePlayer);
app.delete("/api/delete/player/:id", controller.deleteAPlayer);

//Code to start server
app.listen(3000, function () {
  console.log("Server Started at PORT 2000");
});
