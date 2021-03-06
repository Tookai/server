const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/ /g, "-");
    callback(null, Date.now() + "_" + name);
  },
});

module.exports = multer({ storage: storage }).single("image");
