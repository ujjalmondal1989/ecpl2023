const util = require("util");
const multer = require("multer");
const path = require('path');
const fileURLToPath = require('url')

const maxSize = 50 * 1024 * 1024;


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).array("photos");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
