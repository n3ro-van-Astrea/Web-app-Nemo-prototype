import { useState } from "react";

const Signup = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ сохраняем юзера (login + token) в localStorage
      localStorage.setItem("ussr", JSON.stringify(data));
      console.log("Успешная регистрация:", data);
      setError(null);

      // можно сразу редиректить на страницу заметок
      // window.location.href = "/notes";
    } else {
      setError(data.error);
    }
  };

  return (
    <form
      className="font-mono max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-xl border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Sign Up
      </h3>

      <label className="block text-sm font-medium text-gray-600 mb-1">
        Login:
      </label>
      <input
        type="text"
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <label className="block text-sm font-medium text-gray-600 mb-1">
        Password:
      </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      <button
        type="submit"
        className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
      >
        Sign up
      </button>

      {error && (
        <div className="mt-4 text-center text-red-600 text-sm">{error}</div>
      )}
    </form>
  );
};

export default Signup;
