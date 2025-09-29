const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "SECRETKEYNERO2008", { expiresIn: "3d" });
};

// Логин
const loginUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.login(login, password);
    const token = createToken(user._id);

    res.status(200).json({ login: user.login, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Регистрация
const signUpUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.signup(login, password);
    const token = createToken(user._id);

    res.status(200).json({ login: user.login, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpUser };
