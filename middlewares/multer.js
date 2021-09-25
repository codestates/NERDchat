const multer = require('multer');
// const path = require('path');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

module.exports = {
  uploadImage: (req, res, next) => {
    const s3 = new aws.S3({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretKey,
      region: process.env.region
    });
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(null, `avatar/${Date.now()}_${file.originalname}`);
        }
      })
    });
    return upload.array('avatar')(req, res, next);
  }
};
// 폴더명을 아바타로 만들어야지 저게 된다. => 폴더만 만들면 제대로 작동을 해야해. 그리고 fixprofile에서도 경로가
// 잘 보여야된다.

// uploadGameImage: (req, res, next) => {
//   const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: process.env.BUCKET_NAME,
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       acl: 'public-read',
//       key: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//       }
//     })
//   });
//   return upload.array('avatar')(req, res, next);
// }
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads');
//     },
//     filename: async function (req, file, cb) {
//       cb(null, new Date().valueOf() + path.extname(file.originalname));
//     }
//   })
// });

// 게임 이미지 보내주는 것 추가해야해
// 라우터에도 추가해줘야 한다.
// 멀터의 버킷이름이 필요해 => 그리고 잘 되는지 확인도 해야해
// upload.array('이름') 수정 필요
// 버킷네임도 두개로 나누어야 해
// 이름은 이미지 링크로 들어간다.=> 경로 잘 만들어지는지 보고 경로지정만 하면 될 것 같기도 하다
