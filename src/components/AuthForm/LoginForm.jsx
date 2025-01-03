import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { login, loading, error, currentUser } = useAuth(); // Ошибка теперь из контекста
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/"); // Перенаправляем, если пользователь уже авторизован
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(userName, password); // Ждем завершения login
    } catch (err) {
      console.error("Ошибка входа", err);
    }
  };

  return (
    <>
      <div className="flex relative flex-col gap-4 items-center text-white  justify-center min-h-screen max-h-screen">
        <Link to={"/"} className="absolute top-0 left-0 p-4 text-white">
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
        <h1 className="font-bold text-xl">Вход</h1>
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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

        {/* Отображаем ошибку, если она есть */}
        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading} // Делаем кнопку неактивной во время загрузки
          className="px-3 py-2 bg-gray-800 rounded hover:bg-neutral-800 active:bg-neutral-700"
        >
          {loading ? "Загрузка..." : "Войти"}{" "}
          {/* Отображаем текст в зависимости от состояния */}
        </button>

        <Link to={"/register"}>
          <span className="text-sm text-gray-500 hover:text-gray-400">
            Зарегистрироваться
          </span>
        </Link>
      </div>
    </>
  );
}
