class TokenStore {
  findToken (id) {}
  saveToken (id, token) {}
  findAllToken () {}
}

class InMemoryTokenStore extends TokenStore {
  constructor () {
    super();
    this.tokens = new Map();
  }

  findToken (id) {
    return this.tokens.get(id);
  }

  saveToken (id, token) {
    this.tokens.set(id, token);
  }

  findAllToken () {
    return [...this.tokens.values()];
  }
}

const TOKEN_TTL = 24 * 60 * 60;
const mapToken = ([userId, avatar, nickname, connected]) =>
  userId ? { userId, avatar, nickname, connected: connected === 'true' } : undefined;

class RedisTokenStore extends TokenStore {
  constructor (redisClient) {
    super();
    this.redisClient = redisClient;
  }

  findToken (id) {
    return this.redisClient
      .hmget(`token:${id}`, 'userId', 'avatar', 'nickname', 'connected')
      .then(mapToken);
  }

  saveToken (id, { userId, avatar, nickname, connected }) {
    this.redisClient.multi()
      .hset(
                `token:${id}`,
                'userId',
                userId,
                'avatar',
                avatar,
                'nickname',
                nickname,
                'connected',
                connected
      ).expire(`token:${id}`, TOKEN_TTL).exec();
  }

  async findAllToken () {
    const keys = new Set();
    let nextIndex = 0;
    do {
      const [nextIndexStr, results] = await this.redisClient.scan(
        nextIndex,
        'MATCH',
        'token:*',
        'COUNT',
        '100'
      );
      nextIndex = parseInt(nextIndexStr, 10);
      results.forEach((el) => keys.add(el));
    } while (nextIndex !== 0);
    const commands = [];
    keys.forEach((key) => {
      commands.push(['hmget', key, 'userId', 'avatar', 'nickname', 'connected']);
    });
    return this.redisClient.multi(commands).exec()
      .then((results) => {
        return results.map(([err, token]) => (err ? undefined : mapToken(token)))
          .filter((v) => !!v);
      });
  }
}
module.exports = {
  InMemoryTokenStore,
  RedisTokenStore
};
