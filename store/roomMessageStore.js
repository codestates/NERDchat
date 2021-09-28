class RoomMessageStore {
  saveRoomMessages (message) {}
  findRoomMessagesForUser (roomUuid) {}
}
class InMemoryRoomMessageStore extends RoomMessageStore {
  constructor () {
    super();
    this.messages = [];
  }

  saveRoomMessages (message) {
    this.messages.push(message);
  }

  findRoomMessagesForUser (roomUuid) {
    return this.messages.filter(
      ({ uuid }) => uuid === roomUuid
    );
  }
}
const MESSAGE_TTL = 24 * 60 * 60;
class RedisRoomMessageStore extends RoomMessageStore {
  constructor (redisClient) {
    super();
    this.redisClient = redisClient;
  }

  saveRoomMessages (message) {
    const value = JSON.stringify(message);
    this.redisClient.multi()
      .rpush(`room:${message.uuid}`, value)
      .expire(`room:${message.uuid}`, MESSAGE_TTL)
      .exec();
  }

  findRoomMessagesForUser (uuid) {
    return this.redisClient.lrange(`room:${uuid}`, 0, -1)
      .then((results) => results.map((result) => JSON.parse(result)));
  }
}
module.exports = {
  InMemoryRoomMessageStore,
  RedisRoomMessageStore
};
