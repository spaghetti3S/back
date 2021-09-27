const axios = require("axios");
require("dotenv").config();

const getBooksWithTitleURL = (keyword) => {
  return encodeURI(
    `http://data4library.kr/api/srchBooks?authKey=${process.env.LIBRARY_API_KEY}&keyword=${keyword}&pageNo=1&pageSize=10&format=json`
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
