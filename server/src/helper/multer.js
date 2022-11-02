const multer = require("multer");

const uploadImage = (path) => {

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  return multer({ storage: storage });

};

module.exports = uploadImage;