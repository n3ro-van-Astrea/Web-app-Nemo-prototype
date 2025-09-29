const Note = require("../models/noteModel");
const mongoose = require("mongoose");

//Получение всех заметок

const getAllNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json(notes);
};

//Получение одной заметки

const getOneNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Заметка на найдена" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "Заметка не найдена" });
  }

  res.status(200).json(note);
};

//Добавление заметки

const addNote = async (req, res) => {
  const { title, content } = req.body;

  //Добавление в базу данных
  try {
    const note = await Note.create({ title, content, user: req.user._id });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Удаление заметки

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note" });
  }

  const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

//Изменение заметки

const changeNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

module.exports = {
  getAllNotes,
  getOneNote,
  addNote,
  deleteNote,
  changeNote,
};
