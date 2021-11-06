const axios = require("axios");
require("dotenv").config();

const getBooksWithTitleURL = (keyword) => {
  return encodeURI(
    `http://data4library.kr/api/srchBooks?authKey=${process.env.LIBRARY_API_KEY}&keyword=${keyword}&pageNo=1&pageSize=10&format=json`
  );
};

const getBookInfoURL = (isbn) => {
  return encodeURI(
    `http://data4library.kr/api/srchDtlList?authKey=${process.env.LIBRARY_API_KEY}&isbn13=${isbn}&loaninfoYN=Y&format=json`
  );
};

const getBookListURL = (code) => {
  return encodeURI(
    `http://data4library.kr/api/loanItemSrch?authKey=${process.env.LIBRARY_API_KEY}&dtl_kdc=${code}&pageSize=15&format=json`
  );
};

const getRelevenceURL = (code) => {
  return encodeURI(
    `http://data4library.kr/api/recommandList?authKey=${process.env.LIBRARY_API_KEY}&isbn13=${code}&format=json`
  );
};

const getLibraryInfoURL = (code) => {
  return encodeURI(
    `http://data4library.kr/api/extends/libSrch?authKey=${process.env.LIBRARY_API_KEY}&pageNo=1&pageSize=10&dtl_region=${code}&format=json`
  );
};

exports.getBooksWithTitle = async (req) => {
  try {
    const data = await axios.get(getBooksWithTitleURL(req.params.keyword));
    return data.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.getBookInfo = async (req) => {
  try {
    const data = await axios.get(getBookInfoURL(req.params.isbn));
    return data.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.getBookList = async (req) => {
  try {
    const data = await axios.get(getBookListURL(req.params.code));
    return data.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.getRelevence = async (req) => {
  try {
    const data = await axios.get(getRelevenceURL(req.params.isbn));
    return data.data.response;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.getLibraryInfo = async (req) => {
  try {
    const data = await axios.get(getLibraryInfoURL(req.params.region));
    return data.data.response;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
