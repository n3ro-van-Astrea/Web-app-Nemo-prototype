const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Требуется токен авторизации" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, "SECRETKEYNERO2008");
    req.user = await User.findById(_id).select("_id"); // 👈 тут появляется req.user
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Запрос не авторизован" });
  }
};

module.exports = requireAuth;
