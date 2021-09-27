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
}
