const uploadFile = require("../middlewares/upload");
var playerModel = require("../models/players");

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    const { 
      name,
      age,
      height,
      weight,
      position,
      achievements,
      address,
      soldTo,
      soldAmount 
    } = req.body;
    playerPhotos = req.files.map((fl)=>{
      return fl.originalname;
    });
    const newPlayer = new playerModel({
      name,
      age,
      height,
      weight,
      position,
      achievements,
      address,
      photos: playerPhotos,
      soldTo,
      soldAmount
    });
    if (req.files == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    newPlayer.save();
    res.status(200).send({
      message: "Player added successfully: ",
    });
  } catch (err) {
    console.log(req);
    res.status(500).send({
      message: `Could not upload the file: ${req.files[0].originalname}. ${err}`,
    });
  }
};

const getPlayers = async(req, res) => {
  const players = await playerModel.find();
  res.status(200).send({
    players
  });
}

const updatePlayer = async(req, res) => {
  const player = await playerModel.findById(req.params.id).exec();
  if(!player) res.status(500).send({
    message: "Player not found"
  });
  try {
    await uploadFile(req, res);
  const { 
    name,
    age,
    height,
    weight,
    position,
    achievements,
    address,
    soldTo,
    soldAmount 
  } = req.body;
  playerPhotos = req.files.map((fl)=>{
    console.log(fl);
    return fl.originalname;
  });
  const updatePlayer = await playerModel.findByIdAndUpdate(req.params.id, { 
    name,
    age,
    height,
    weight,
    position,
    achievements,
    address,
    photos: playerPhotos,
    soldTo,
    soldAmount 
  }).exec();
  res.status(200).send({
    updatePlayer
  });
} catch (err) {
  console.log(req);
  res.status(500).send({
    message: `Could not upload the file: ${req.files[0].originalname}. ${err}`,
  });
}
}

const getAPlayer = async(req, res) => {
  const player = await playerModel.findById(req.params.id);
  res.status(200).send({
    player
  });
}

const deleteAPlayer = async(req, res) => {
  const player = await playerModel.findByIdAndDelete(req.params.id);
  res.status(200).send({
    player
  });
}

module.exports = {
  upload,
  getAPlayer,
  updatePlayer,
  getPlayers,
  deleteAPlayer
};
