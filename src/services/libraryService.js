exports.getExample = async (req) => {
  try {
    return "hello";
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
