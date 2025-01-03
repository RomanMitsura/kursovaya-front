import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const URL = "https://json-server-repo.onrender.com";

  // Функция для обработки регистрации
  const handleRegister = () => {
    // Проверка на пустые значения
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Все поля должны быть заполнены.");
      return;
    }

    fetch(`${URL}/users`)
      .then((res) => res.json())
      .then((users) => {
        // Проверяем, существует ли уже такой пользователь
        const userExists = users.some(
          (user) => user.username === username || user.email === email
        );

        if (userExists) {
          setError("Пользователь с таким именем или почтой уже существует.");
          return;
        }

        // Создаем нового пользователя
        const newUser = { username, email, password };

        // Отправляем нового пользователя на сервер (в db.json)
        fetch(`${URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then(() => {
            // Перенаправляем на страницу входа после успешной регистрации
            navigate("/login");
          });
      });
  };

  return (
    <div className="flex relative flex-col gap-4 items-center text-white  justify-center min-h-screen">
      <Link to={"/login"} className="absolute top-0 left-0 p-4 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </Link>
      <h1 className="font-bold text-xl">Регистрация</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 group">
          <label
            htmlFor="username"
            className="group-focus-within:text-blue-400"
          >
            Имя пользователя
          </label>
          <input
            id="username"
            type="text"
            className="px-3 py-2 bg-neutral-800 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 group">
          <label htmlFor="mail" className="group-focus-within:text-blue-400">
            Почта
          </label>
          <input
            id="mail"
            type="email"
            className="px-3 py-2 bg-neutral-800 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 group">
          <label
            htmlFor="password"
            className="group-focus-within:text-blue-400"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className="px-3 py-2 bg-neutral-800 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleRegister}
        className="px-3 py-2 bg-gray-800 rounded hover:bg-neutral-800 active:bg-neutral-700"
      >
        Создать аккаунт
      </button>
    </div>
  );
}
