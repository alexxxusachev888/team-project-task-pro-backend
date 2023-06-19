const multer = require("multer");
const path = require("path");

const pathUpload = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: pathUpload,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;