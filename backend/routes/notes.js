const express = require("express");
const {
  getAllNotes,
  getOneNote,
  addNote,
  deleteNote,
  changeNote,
} = require("../controllers/notesController");

const requireAuth = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);
//Получение всех заметок
router.get("/", getAllNotes);

//Получение одной заметки
router.get("/:id", getOneNote);

//Добавление заметки
router.post("/", addNote);

//Удаление заметки
router.delete("/:id", deleteNote);

//Изменение заметки
router.patch("/:id", changeNote);

module.exports = router;
