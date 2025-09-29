import React from "react";
import { MdDelete } from "react-icons/md";

const NoteDetails = ({ note, setNotes }) => {
  const deleteNoteFunction = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      console.error("Токен не найден");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/notes/" + note._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
    } else {
      const errorData = await response.json();
      console.error("Ошибка удаления:", errorData.error);
    }
  };

  return (
    <div className="flex flex-col gap-1 mt-5 shadow-lg bg-gray-900 border-1 border-white text-white p-3 rounded-xl">
      <div className="flex justify-between">
        <h2 className="text-xl">{note.title}</h2>
        <MdDelete onClick={deleteNoteFunction} color="red" size={22} />
      </div>
      <p>
        <strong>Задача: </strong>
        {note.content}
      </p>
    </div>
  );
};

export default NoteDetails;
