const { GameChatRooms } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { v4 } = require('uuid');

module.exports = async (req, res) => {
  const token = req.headers.authentication;
  if (!token) res.status(401).json({ message: 'token not found' });
  else {
    const userData = verifyAccess(token);
    if (!userData) res.status(400).json({ message: 'token exipred' });
    else {
      const { gameId, title, max } = req.body;
      const uuid = v4();
      const payload = {
        roomAdmin: userData.id,
        roomTitle: title,
        uuid,
        gameId,
        max,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await GameChatRooms.create(payload);
      res.status(200).json({
        payload
      });
    }
  }
};
