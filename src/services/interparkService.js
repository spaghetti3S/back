const axios = require("axios");
require("dotenv").config();

// 신간 도서 가져오기
const getNewBooksAPI = (id) => {
  return encodeURI(
    `http://book.interpark.com/api/recommend.api?key=${process.env.INTERPARK_API_KEY}&categoryId=${id}&output=json`
  );
};
exports.getNewBooks = async (req) => {
  try {
    const data = await axios.get(getNewBooksAPI(req.params.id));
    return data.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

// 카테고리별 베스트셀러
const getBestsellerAPI = (id) => {
  return encodeURI(
    `http://book.interpark.com/api/bestSeller.api?key=${process.env.INTERPARK_API_KEY}&categoryId=${id}&output=json`
  );
};
exports.getBestseller = async (req) => {
  try {
    const data = await axios.get(getBestsellerAPI(req.params.id));
    return data.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

// 키워드 검색
const getBookSearchAPI = (keyword, queryType) => {
  return encodeURI(
    `http://book.interpark.com/api/search.api?key=${process.env.INTERPARK_API_KEY}&query=${keyword}&queryType=${queryType}&output=json`
  );
};
exports.getBookSearch = async (req) => {
  try {
    const data = await axios.get(
      getBookSearchAPI(req.query.keyword, req.params.queryType)
    );
    return data.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
