const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");

const notesRoutes = require("./routes/notes");
const userRoutes = require("./routes/user");

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//ROUTES

app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);

//Подключение к базе данных и серверу
mongoose
  .connect(
    "mongodb+srv://nero:nero2008@cluster0.kdnkhte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("База данных подключена");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Сервер подлючен на порте:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
