import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [nick, setNick] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user"); // тот же ключ
      if (!userData) return;

      const user = JSON.parse(userData);
      if (user.login) {
        setNick(user.login); // сохраняем логин в состояние
      }
    } catch (err) {
      console.error("Ошибка чтения юзера из localStorage:", err);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="p-5 font-mono w-[101vw] flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4 text-white">{nick}</h1>
      <button
        onClick={logout}
        className="px-4 py-2 text-xl bottom-25 fixed bg-red-600 text-white rounded-lg hover:bg-red-500"
      >
        Выйти
      </button>
    </div>
  );
};

export default ProfilePage;
