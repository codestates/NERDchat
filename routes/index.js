const express = require("express");
const router = express.Router();
const { uploadImage } = require("../middlewares/multer");
const {
  users,
  rooms,
  category,
  favorites,
  friends,
  admin,
} = require("../controllers/index");
const oauth = require("../controllers/oauth");

/*
    User Router
*/
router.post("/login", users.login);
router.put("/signup", users.signup);
router.get("/logout", users.logout);
router.get("/profile/:nickname", users.profile);
router.patch("/fixprofile", uploadImage, users.fixProfile);
router.delete("/withdraw", users.withdraw);
router.post("/emailVerify", users.emailVerify);

/*
    Room Router
*/
router.put("/rooms/create", rooms.create);
router.post("/rooms/list/:page", rooms.getList);
router.get("/rooms/join/:gameId/:uuid", rooms.joinRoom);
router.post("/rooms/exit/gameId/:uuid", rooms.exitRoom);
router.get("/rooms/search/:title", rooms.searchRoom);
/*
    Category Router
*/
router.get("/category/lists/:page", category.getCategoryList);
router.get("/category/search/:name", category.categorySearch);
/*
    Favorite Router
*/
router.get("/favorites/lists", favorites.favLists);
router.get("/favorites/request/:gameId", favorites.favRequest);
/*
    Friends Router
*/
router.get("/friends/lists", friends.friendsList);
router.get("/friends/send/:id", friends.friendsRequest);
router.post("/friends/accept/:nickname", friends.accept);
router.get("/friends/requests", friends.requestList);
router.delete("/friends/delete/:nickname", friends.delete);
/*
    Admin Router
*/
router.post("/admin/gamecategory", admin.addgamecategory);
router.delete("/admin/delete/room/:uuid", admin.deleteroom);
router.delete("/admin/delete/user/:id", admin.deleteuser);
/*
    OAuth Router
*/
router.get("/oauth/facebook", oauth.facebook);
router.get("/oauth/google", oauth.google);
router.post("/oauth/kakao", oauth.kakao);

module.exports = router;
