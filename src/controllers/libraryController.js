const libraryService = require("../services/libraryService");

// 제목으로 검색하여 도서목록 반환
exports.getBooksWithTitle = async (req, res, next) => {
  try {
    let rows = await libraryService.getBooksWithTitle(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
// ISBN 코드로 도서 상세 정보 반환
exports.getBookInfo = async (req, res, next) => {
  try {
    let rows = await libraryService.getBookInfo(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
// 카테고리별 도서 리스트 반환
exports.getBookList = async (req, res, next) => {
  try {
    let rows = await libraryService.getBookList(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getRelevence = async (req, res, next) => {
  try {
    let rows = await libraryService.getRelevence(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getLoanAvailable = async (req, res, next) => {
  try {
    let rows = await libraryService.getLoanAvailable(req);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
