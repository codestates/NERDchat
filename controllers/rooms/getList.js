const { GameChatRooms } = require('../../models');
const io = require('socket.io')();

module.exports = async (req, res) => {
  const page = req.params.page || 1;
  const { gameId } = req.body;
  const offset = 10 * (page - 1);
  try {
    const listData = await GameChatRooms.findAll({ where: { gameId }, offset, limit: 10 });
    if (!listData) res.status(404).json({ message: 'rooms not found' });
    else {
      const data = []
      listData.map((el) => {
        const temp = {};
        for(let key in el.dataValues) {
          temp[key] = el[key]
          if(key === 'uuid') temp.len = io.sockets.adapter.rooms.get(el[key]) || 0;
        }
        data.push(temp)
      })
      res.status(200).json({ data });
    }
  } catch (err) {
    console.log(err);
  }
};
