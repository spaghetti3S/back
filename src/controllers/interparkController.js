const interparkService = require("../services/interparkService");

exports.getBestseller = async (req, res, next) => {
  try {
    let rows = await interparkService.getBestseller(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getBookSearch = async (req, res, next) => {
  try {
    let rows = await interparkService.getBookSearch(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getNewBooks = async (req, res, next) => {
  try {
    let rows = await interparkService.getNewBooks(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
