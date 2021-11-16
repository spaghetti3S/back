const bcrypt = require("bcrypt");

const library = require("../schema/library");
const user = require("../schema/user");

exports.getLibraryAround = async (req) => {
  try {
    let bound = req.body.bound;
    bound = bound.replaceAll("(", "");
    bound = bound.replaceAll(")", "");
    bound = bound.replaceAll(" ", "");
    bound = bound.split(",");

    const data = await library.find({
      latitude: { $gt: bound[0], $lt: bound[2] },
      longitude: { $gt: bound[1], $lt: bound[3] },
    });
    return data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.registerUser = async (req) => {
  try {
    const userRegisterInfo = req.body.info;
    const idCheck = await user.find({
      userId: userRegisterInfo.id,
    });
    if (idCheck[0]) {
      return { registerSuccess: false };
    }

    const encodedPassword = bcrypt.hashSync(userRegisterInfo.password, 10);
    const userData = new user({
      id: 1,
      userId: userRegisterInfo.id,
      password: encodedPassword,
      sex: userRegisterInfo.sex,
      age: userRegisterInfo.age,
    }).save();
    const data = await user.insert;
    return { registerSuccess: true };
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.loginUser = async (req) => {
  try {
    const userData = req.body.info;
    const data = await user.find({
      userId: userData.userId,
    });
    const passwordMatch = bcrypt.compareSync(
      userData.password,
      data[0].password
    );
    if (passwordMatch) {
      req.session.user = {
        userId: userData.userId,
        sex: data[0].sex,
        age: data[0].age,
        valid: new Date() + 86400,
      };
      return { code: 200, msg: "Login Success", cookie: req.session };
    } else {
      return { code: 400, msg: "Login Failed" };
    }
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.logoutUser = async (req) => {
  try {
    req.session.destroy();
    return { logoutSuccess: true };
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.sessionCheck = async (req, res) => {
  try {
    if (req.session.user) {
      console.log("session exists:" + req.session.user);
      return { sessionExist: true };
    } else {
      console.log("session not exists");
      return { sessionExist: false };
    }
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
