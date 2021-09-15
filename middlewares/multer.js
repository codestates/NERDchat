const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = {
  uploadImage: (image) => upload.single(image)
};
