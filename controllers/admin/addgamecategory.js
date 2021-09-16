const { GameCategory } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  const category = req.body.category;
  const image = req.files[0].filename;
  if (!userData.superuser) res.status(403).json({ message: 'not admin' });
  else {
    try {
      await GameCategory.create({
        image: image || null,
        category,
        created_at: new Date(),
        updated_at: new Date()
      });
      res.status(200).json({ data: { image, category } });
    } catch (err) {
      console.log(err);
    }
  }
};
// 1.id는 어떻게해... 게임카테고리로 찾은담에 그걸 넣어준다고...?일단 뺏어
// 2.userdata에 superuser가 없어. 왜냐하면 토큰에 superdata를 넣어주지 않았기 때문이야.
// 3.image는 required로 바꾸는게...
// 라우터도 해줘야해 잊지말기
