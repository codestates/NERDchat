const { GameChatRooms } = require('../../models');

module.exports = async (req, res) => {
  const page = req.params.page || 1;
  const { gameId } = req.body;
  const offset = 10 * (page - 1);
  try {
    const listData = await GameChatRooms.findAll({ where: { gameId }, offset, limit: 10 });
    if (!listData) res.status(404).json({ message: 'rooms not found' });
    else res.status(200).json({ data: listData });
  } catch (err) {
    console.log(err);
  }
};
