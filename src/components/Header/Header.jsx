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
        <svg
          width="80px"
          height="80px"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sm:block hidden"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <rect width="0" height="10" fill="white" fillOpacity="0.01" />
            <path
              d="M11.0634 10.4144C16.6066 10.1381 20.9181 10 23.9978 10C27.0778 10 31.3908 10.1382 36.9368 10.4145V10.4145C39.9389 10.5641 42.367 12.9119 42.6174 15.9072C42.871 18.9412 42.9978 21.6134 42.9978 23.9238C42.9978 26.2626 42.8679 28.972 42.608 32.0522H42.608C42.3584 35.0103 39.9831 37.3412 37.0207 37.5349C32.2793 37.845 27.9383 38 23.9978 38C20.0578 38 15.7184 37.845 10.9796 37.5351V37.5351C8.01828 37.3414 5.64346 35.0119 5.39264 32.055C5.12941 28.9518 4.9978 26.2414 4.9978 23.9238C4.9978 21.6341 5.12627 18.961 5.3832 15.9044L5.38321 15.9044C5.6349 12.9103 8.06249 10.564 11.0634 10.4144Z"
              fill="#1a7dff"
              stroke="#000000"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M21 19.6092V28.4061C21 28.8794 21.3838 29.2632 21.8571 29.2632C22.0252 29.2632 22.1896 29.2138 22.3298 29.1211L28.9274 24.7606C29.3223 24.4996 29.4308 23.9678 29.1698 23.5729C29.1074 23.4785 29.0269 23.3973 28.933 23.3342L22.3354 18.8979C21.9426 18.6338 21.41 18.7381 21.1458 19.131C21.0508 19.2724 21 19.4389 21 19.6092Z"
              fill="#1a7dff"
              stroke="white"
              strokeWidth="3.42857"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </Link>
      <div className="group flex items-center pl-10 sm:pl-7">
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
      <div>
        {currentUser ? (
          <Link
            to={`/profile/${currentUser.id}`}
            className="flex items-center gap-2"
          >
            <span className="text-white hidden sm:block">
              {currentUser.username}
            </span>
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
            <span className="text-white hidden sm:block">Войти</span>
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
    </div>
  );
}
