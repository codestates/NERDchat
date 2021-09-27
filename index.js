const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const Redis = require('ioredis');
const redisClient = new Redis(6379, process.env.REDIS_HOST);
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'HEAD']
  },
  adapter: require('socket.io-redis')({
    pubClient: redisClient,
    subClient: redisClient.duplicate()
  })
});
const { setupWorker } = require('@socket.io/sticky');

const routes = require('./routes/index');
const controller = require('./controllers/index');

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello, world!!!!!!'));

app.use('/', routes);

io.use(controller.socket.useToken);

io.of(/^\/\d+$/).on('connection', controller.socket.socket);

setupWorker(io);
