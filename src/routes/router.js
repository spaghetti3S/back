const express = require("express");
const cors = require("cors");
const router = express.Router();

const libraryController = require("../controllers/libraryController");
const interparkController = require("../controllers/interparkController");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

// 인터파크 API
router.get("/book/search/:queryType", interparkController.getBookSearch);
router.get("/books/bestseller/:id", interparkController.getBestseller);
router.get("/books/newBooks/:id", interparkController.getNewBooks);

// 도서관 API
router.get("/book/library/:isbn", libraryController.getBookInfo);
router.get("/books/relevence/:isbn", libraryController.getRelevence);
router.get("/library/info/:region", libraryController.getLibraryInfo);

module.exports = router;
