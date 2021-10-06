class RoomStore {
  findRoom (room) {}
  saveRoom (user) {}
}

class InMemoryRoomStore extends RoomStore {
  constructor () {
    super();
    this.rooms = {};
  }

  findRoom (room) {
    return this.rooms[room.uuid];
  }

  saveRoom (room) {
    return this.rooms[room.uuid].push(room.user);
  }

  deleteRoomUser (room) {
    const idx = this.rooms[room.uuid].indexOf(room.user);
    if (idx > -1) { return this.rooms[room.uuid].splice(idx, 1); }
  }
}
const ROOM_TTL = 24 * 60 * 60;
class RedisRoomStore extends RoomStore {
  constructor (redisClient) {
    super();
    this.redisClient = redisClient;
  }

  findRoom (room) {
    return this.redisClient.lrange(`roomUser:${room.uuid}`, 0, -1)
      .then((res) => res.map(result => JSON.parse(result)));
  }

  saveRoom (room) {
    const userData = JSON.stringify(room.user);
    this.redisClient.multi()
      .rpush(`roomUser:${room.uuid}`, userData)
      .expire(`roomUser:${room.uuid}`, ROOM_TTL).exec();
  }

  deleteRoomUser (room) {
    const userData = JSON.stringify(room.user);
    this.redisClient.multi()
      .lrem(`roomUser:${room.uuid}`, 1, userData).exec();
  }
}
module.exports = {
  InMemoryRoomStore,
  RedisRoomStore
};
