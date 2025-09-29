import { useState } from "react";

const Noteform = ({ setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setError("Вы должны войти, чтобы добавить заметку");
      return;
    }

    const note = { title, content };

    const response = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // 🔑 добавляем токен
      },
      body: JSON.stringify(note),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || "Ошибка при добавлении заметки");
    } else {
      setError(null);
      setTitle("");
      setContent("");
      // обновляем список заметок в HomePage
      if (setNotes) setNotes((prev) => [json, ...prev]);
    }
  };

  return (
    <div className=" mx-4 rounded-xl text-xl font-mono mt-5 flex flex-col items-center h-[75vh] justify-center">
      <form
        className="shadow-md text-white flex flex-col bg-gray-900 border-1 border-white p-7 rounded-xl text-2xl"
        onSubmit={handleSubmit}
      >
        <h3 className=" mb-4">Введите новую заметку</h3>

        <label htmlFor="">Заголовок:</label>
        <input
          className="outline-none border-1 border-white rounded-lg p-1 my-1"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="">Задача:</label>
        <input
          className="outline-none  border-1 border-white rounded-lg p-1 my-1"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        <button className=" p-1 bg-gray-200 text-gray-900 font-medium rounded-xl w-[100%] text-center mt-4">
          Добавить заметку
        </button>

        {error && <div className="text-xl text-red-700 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Noteform;
