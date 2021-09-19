const libraryService = require("../services/libraryService");

exports.getExample = async (req, res, next) => {
  try {
    let rows = await libraryService.getExample(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
