const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// регистрация
userSchema.statics.signup = async function (login, password) {
  const exists = await this.findOne({ login });
  if (exists) throw new Error("Логин уже занят");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ login, password: hash });
  return user;
};

// логин
userSchema.statics.login = async function (login, password) {
  if (!login || !password) throw new Error("Все поля должны быть заполнены");

  const user = await this.findOne({ login });
  if (!user) throw new Error("Неверный логин");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Неверный пароль");

  return user;
};

module.exports = mongoose.model("User", userSchema);
