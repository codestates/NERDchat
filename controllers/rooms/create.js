const { GameChatRooms } = require('../../models');
const { verifyAccess } = require('../../middlewares/token');
const { v4 } = require('uuid');

module.exports = async (req, res) => {
  const userData = verifyAccess(req, res);
  if (userData) {
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
    const roomData = await GameChatRooms.findOne({ where: { uuid } });
    res.status(201).json({
      data: roomData
    });
  }
};
