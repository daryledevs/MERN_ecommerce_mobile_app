const multer = require("multer");

const uploadImage = (path) => {

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },

    filename: function (req, file, cb) {
      const regex_removeWhiteSpaces = /\s/g;
      cb(null, file.originalname.replace(regex_removeWhiteSpaces, "_"));
    },
  });

  return multer({ storage: storage });

};

module.exports = uploadImage;