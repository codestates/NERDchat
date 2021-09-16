module.exports = {
  socket: require('./socket'),
  users: require('./users/index'),
  rooms: require('./rooms/index'),
  category: require('./gamecategory/index'),
  favorites: require('./favorites/index'),
  friends: require('./friends/index'),
  admin: require('./admin/index'),
  oauth: require('./oauth.index')
};
