const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const library = require("../schema/library");
const user = require("../schema/user");
const userBook = require("../schema/userBook");

const generateToken = (userId) => {
  const token = jwt.sign(
    {
      _id: this.id,
      userId: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

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
      const token = generateToken(userData.userId);
      return { code: 200, msg: "Login Success", token: token };
    } else {
      return { code: 400, msg: "Login Failed" };
    }
  } catch (err) {
    console.log(err);
    return { code: 400, msg: "Login Failed" };
  }
};

exports.getUserInfo = async (req) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    const data = await user.find({
      userId: decoded.userId,
    });
    return { code: 200, data: data[0] };
  } catch (err) {
    console.log(err);
    return { code: 400, msg: "Get user info Failed" };
  }
};

exports.changeState = async (req) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (decoded.userId !== req.body.userId) {
      return { code: 400, msg: "Failed change" };
    }
    if (req.body.action === "true") {
      const userBookData = new userBook({
        userId: req.body.userId,
        isbn: req.body.book,
        state: req.body.type,
      }).save();
    } else {
      await userBook.remove({
        userId: req.body.userId,
        isbn: req.body.book,
        state: req.body.type,
      });
    }

    return { code: 200, msg: "Success change" };
  } catch (err) {
    console.log(err);
    return { code: 400, msg: "Failed change" };
  }
};

exports.getState = async (req) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (decoded.userId !== req.body.userId) {
      return { code: 400, msg: "Wrong login" };
    }
    const interest = await userBook.find({
      userId: req.body.userId,
      isbn: req.body.book,
      state: "interest",
    });
    const read = await userBook.find({
      userId: req.body.userId,
      isbn: req.body.book,
      state: "read",
    });
    const totalIntrest = await userBook.find({
      isbn: req.body.book,
      state: "interest",
    });
    const totalRead = await userBook.find({
      isbn: req.body.book,
      state: "read",
    });
    return {
      code: 200,
      interest: interest,
      read: read,
      interestCount: totalIntrest.length,
      readCount: totalRead.length,
    };
  } catch (err) {
    console.log(err);
    return { code: 400, msg: "Failed" };
  }
};

exports.getUserBook = async (req) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    const data = await userBook.find({
      userId: decoded.userId,
      state: req.body.state,
    });
    return { code: 200, data: data };
  } catch (err) {
    console.log(err);
    return { code: 400, msg: "Get book info Failed" };
  }
};

exports.reviseUserInfo = async (req) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (decoded.userId !== req.body.userId) {
      return { code: 400, msg: "Failed change" };
    }
    await user.updateOne(
      { userId: req.body.userId },
      { sex: req.body.RSex, age: req.body.RAge }
    );
    return { code: 200, msg: "Success change" };
  } catch (err) {
    console.log(err);
    return { code: 400, msg: "Failed change" };
  }
};
