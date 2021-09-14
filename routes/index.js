const express = require('express');
const router = express.Router();
const { users } = require('../controllers/index');
const { rooms } = require('../controllers/rooms/index');

/*
    User Router
*/
router.post('/login', users.login);

/*
    Room Router
*/
router.put('/rooms/create', rooms.create);

module.exports = router;
