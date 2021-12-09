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

exports.getUserInfo = async (req, res, next) => {
  try {
    let rows = await mongodbService.getUserInfo(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.changeState = async (req, res, next) => {
  try {
    let rows = await mongodbService.changeState(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getState = async (req, res, next) => {
  try {
    let rows = await mongodbService.getState(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getUserBook = async (req, res, next) => {
  try {
    let rows = await mongodbService.getUserBook(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
