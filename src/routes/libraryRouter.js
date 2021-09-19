const express = require("express");
const router = express.Router();

const libraryController = require("../controllers/libraryController");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/test", libraryController.getExample);

module.exports = router;
