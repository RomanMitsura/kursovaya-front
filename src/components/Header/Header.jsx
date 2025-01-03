// components/Header/Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext"; // Импортируем контекст поиска

export default function Header() {
  const { currentUser } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch(); // Получаем searchQuery и setSearchQuery из контекста

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Обновляем запрос поиска через контекст
  };

  return (
    <div className="flex justify-between py-6 items-center">
      <Link to={"/"}>
        <span className="bg-blue-500 p-2 hidden sm:block">logo</span>
      </Link>
      <div className="group flex items-center pl-20 sm:pl-7">
        <input
          className="text-white all:unset border border-r-0 border-gray-400 focus:outline-none focus:border-blue-400 bg-neutral-900 px-3 py-2 rounded-l-md"
          type="text"
          placeholder="Введите видео"
          value={searchQuery} // Отображаем текущий запрос поиска
          onChange={handleSearchChange} // Обработчик для изменения текста
        />
        <label className="bg-neutral-900 px-3 py-2 rounded-r-md border border-gray-400 group-focus-within:border-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </label>
      </div>

      {currentUser ? (
        <Link
          to={`/profile/${currentUser.id}`}
          className="flex items-center gap-2"
        >
          <span className="text-white">{currentUser.username}</span>
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      ) : (
        <Link to={"/login"} className="flex items-center gap-2">
          <span className="text-white">Войти</span>
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
