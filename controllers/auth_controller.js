const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createToken = require('../utils/createJwtToken');
const setTokenInCookie = require('../utils/setTokenInCookie');
const hashedPassword = require('../utils/hashPassword');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide all field" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exist" });
    }
    const hashPassword = await hashedPassword.hashPassword(password);
    await User.create({ name, email, password: hashPassword });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Signup Successfull!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong!", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide all field" });
    }
    const user = await User.findOne({ email });
    const isPasswordMatch = await hashedPassword.comparePassword(password, user.password);
    console.log(isPasswordMatch);
    if (!user || !isPasswordMatch) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const token = await createToken(user);
    setTokenInCookie(res, token);
    
    
    return res
      .status(StatusCodes.OK)
      .json({ message: "Login successfull", success: true, token });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong!", success: false });
  }
};


const logout = (req, res) => {
    res.clearCookie('token');

    return res.status(StatusCodes.OK).json({msg:'user logout successfully'});
}

module.exports = {
  signup,
  login,
  logout
};
