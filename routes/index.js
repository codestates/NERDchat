const express = require('express');
const router = express.Router();
const { users } = require('../controllers/index');
const { rooms } = require('../controllers/index');

/*
    User Router
*/
router.post('/login', users.login);
router.put('/signup', users.signup);
router.get('/logout', users.logout);
router.get('/profile/:nickname', users.profile);
router.patch('/fixprofile', users.fixProfile);
router.delete('/withdraw', users.withdraw);

/*
    Room Router
*/
router.put('/rooms/create', rooms.create);
router.post('/rooms/list/:page', rooms.getList);
router.get('/rooms/join/:uuid', rooms.joinRoom);
router.post('/rooms/exit/:uuid', rooms.exitRoom);

module.exports = router;
