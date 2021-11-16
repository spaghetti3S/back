const mongodbService = require("../services/mongodbService");

exports.getLibraryAround = async (req, res, next) => {
  try {
    let rows = await mongodbService.getLibraryAround(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    let rows = await mongodbService.registerUser(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    let rows = await mongodbService.loginUser(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    let rows = await mongodbService.logoutUser(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.sessionCheck = async (req, res, next) => {
  try {
    console.log("?");
    let rows = await mongodbService.sessionCheck(req, res);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
