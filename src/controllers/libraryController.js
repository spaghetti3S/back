const libraryService = require("../services/libraryService");

exports.getBooksWithTitle = async (req, res, next) => {
  try {
    let rows = await libraryService.getBooksWithTitle(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
