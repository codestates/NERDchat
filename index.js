const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { createClient } = require('redis');
const redisAdapter = require('@socket.io/redis-adapter');
const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'HEAD']
  }
});
const PORT = process.env.PORT || 8080;

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

const pubClient = createClient({ host: process.env.REDIS_HOST, port: 6379 });
const subClient = pubClient.duplicate();
io.adapter(redisAdapter(pubClient, subClient));

io.of(/^\/\d+$/).on('connection', controller.socket);

httpServer.listen(PORT, () => console.log(`Server is Running ${PORT}`));
