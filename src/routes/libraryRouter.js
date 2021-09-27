const express = require("express");
const cors = require("cors");
const router = express.Router();

const libraryController = require("../controllers/libraryController");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

router.get("/search/title/:keyword", libraryController.getBooksWithTitle);

module.exports = router;
