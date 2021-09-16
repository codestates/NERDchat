const multer = require('multer');
const path = require('path');

module.exports = {
  uploadImage: (req, res, next) => {
    const upload = multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads');
        },
        filename: async function (req, file, cb) {
          cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
      })
    });
    return upload.array('avatar')(req, res, next);
  }
};
