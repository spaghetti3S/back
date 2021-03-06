const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();

const libraryController = require("../controllers/libraryController");
const interparkController = require("../controllers/interparkController");
const mongodbController = require("../controllers/mongodbController");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

// mongoDB 연결
const uri = process.env.MONGO_DB_KEY;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection succes");
});

// 인터파크 API
router.get("/book/search/:queryType", interparkController.getBookSearch);
router.get("/books/bestseller/:id", interparkController.getBestseller);
router.get("/books/newBooks/:id", interparkController.getNewBooks);

// 도서관 API
router.get("/book/library/:isbn", libraryController.getBookInfo);
router.get("/books/relevence/:isbn", libraryController.getRelevence);
router.get("/book/loan/:lib/:isbn", libraryController.getLoanAvailable);

// MongoDB
router.post("/library/around", mongodbController.getLibraryAround);
router.post("/user/register", mongodbController.registerUser);
router.post("/user/login", mongodbController.loginUser);
router.post("/user/info", mongodbController.getUserInfo);
router.post("/user/book", mongodbController.getUserBook);
router.post("/user/revise", mongodbController.reviseUserInfo);
router.post("/book/changeState", mongodbController.changeState);
router.post("/book/getState", mongodbController.getState);

module.exports = router;
