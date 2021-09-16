const express = require('express');
const router = express.Router();
const { uploadImage } = require('../middlewares/multer');
const { users, rooms, category, favorites, friends } = require('../controllers/index');

/*
    User Router
*/
router.post('/login', users.login);
router.put('/signup', users.signup);
router.get('/logout', users.logout);
router.get('/profile/:nickname', users.profile);
router.patch('/fixprofile', uploadImage, users.fixProfile);
router.delete('/withdraw', users.withdraw);
router.post('/emailVerify', users.emailVerify);

/*
    Room Router
*/
router.put('/rooms/create', rooms.create);
router.post('/rooms/list/:page', rooms.getList);
router.get('/rooms/join/:uuid', rooms.joinRoom);
router.post('/rooms/exit/:uuid', rooms.exitRoom);
/*
    Category Router
*/
router.get('/category/lists/:page', category.getCategoryList);
router.get('/category/search/:name', category.categorySearch);
/*
    Favorite Router
*/
router.get('/favorites/lists', favorites.favLists);
router.get('/favorites/request/:gameId', favorites.favRequest);
/*
    Friends Router
*/
router.get('/friends/lists', friends.friendsList);
router.get('/friends/send/:nickname', friends.friendsRequest)

module.exports = router;
