import { useState, useEffect } from "react";
import NoteDetails from "../components/NoteDetails";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [hiddenDates, setHiddenDates] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllNotes = async () => {
      // достаём юзера из localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.token) {
        setError("Вы должны войти, чтобы видеть заметки");
        return;
      }

      const response = await fetch("http://localhost:5000/api/notes", {
        headers: {
          Authorization: `Bearer ${user.token}`, // 🔑 добавляем токен
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Не удалось загрузить заметки");
        return;
      }

      const formattedNotes = json.map((note) => ({
        ...note,
        createdAt: new Date(note.createdAt).toISOString().split("T")[0],
      }));

      setNotes(formattedNotes);
    };

    getAllNotes();
  }, []);

  const uniqueDates = [...new Set(notes.map((note) => note.createdAt))];

  const toggleDate = (date) => {
    setHiddenDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  if (error) {
    return (
      <div className="text-center mt-10 font-mono text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="px-3 font-mono">
      {uniqueDates.map((date) => (
        <div
          key={date}
          className="mt-6 mb-16 bg-gray-800 border-1 border-white p-4 rounded-2xl"
        >
          <div className="flex w-full justify-between">
            <h2 className="text-2xl font-bold text-white">{date}</h2>
            <button
              onClick={() => toggleDate(date)}
              className="text-2xl text-white font-mono font-bold"
            >
              {hiddenDates[date] ? "показать" : "скрыть"}
            </button>
          </div>

          {!hiddenDates[date] && (
            <div className="flex flex-col gap-1">
              {notes
                .filter((note) => note.createdAt === date)
                .map((note) => (
                  <NoteDetails key={note._id} note={note} setNotes={setNotes} />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
