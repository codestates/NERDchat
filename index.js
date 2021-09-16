const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
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
app.get('/header', (req, res) => {
  console.log(req.body);
  res.json(req.headers);
});

app.use('/', routes);

io.on('connection', controller.socket);

app.listen(PORT, () => console.log(`Server is Running ${PORT}`));
