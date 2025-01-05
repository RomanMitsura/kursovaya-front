import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import profileImg from "./../../assets/profileImg.jpeg";
import UserVideos from "../UserVideos/UserVideos";

export default function Profile2() {
  const { currentUser, logout, users } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(profileImg);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Для редактирования пароля
  const [error, setError] = useState(null); // Для отображения ошибок
  const navigate = useNavigate();
  const { id } = useParams(); // Получаем ID пользователя из URL
  // const URL = "https://json-server-repo.onrender.com";
  const URL = "http://localhost:3000";

  useEffect(() => {
    // Проверка на наличие currentUser

    if (!id) {
      console.log("ID пользователя не найден.");
      navigate("/login"); // Перенаправляем на страницу логина, если ID не найден
      return;
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      console.log("Пользователь не найден.");
      navigate("/login"); // Перенаправляем на страницу логина, если пользователь не найден
      return;
    }

    // Устанавливаем данные о пользователе
    setUsername(user.username);
    setProfileImage(user.profileImage || profileImg);
    setEmail(user.email);
  }, [id, users, currentUser, navigate]); // Зависимости для эффекта

  const handleLogout = () => {
    logout();
    navigate("/"); // Перенаправление на главную страницу после выхода
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const setErrorMessage = (message) => setError(message);

  const handleSaveClick = async () => {
    if (!currentUser) {
      setErrorMessage("Пользователь не найден.");
      return;
    }
    // Проверка уникальности имени пользователя и почты
    const usersResponse = await fetch(`${URL}/users`);
    const users = await usersResponse.json();

    const usernameExists = users.some(
      (user) => user.username === username && user.id !== currentUser.id
    );
    if (usernameExists) {
      setErrorMessage("Пользователь с таким именем уже существует.");
      return;
    }

    const emailExists = users.some(
      (user) => user.email === email && user.id !== currentUser.id
    );
    if (emailExists) {
      setErrorMessage("Почта уже зарегистрирована.");
      return;
    }

    // Обновление данных пользователя
    const updatedUser = {
      ...currentUser,
      username,
      profileImage,
      email,
      password: password || currentUser.password,
    };

    try {
      const response = await fetch(`${URL}/users/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setIsEditing(false);
        localStorage.setItem("user", JSON.stringify(updatedUserData)); // Обновление данных в localStorage
      } else {
        setErrorMessage("Ошибка при обновлении данных.");
      }
    } catch (error) {
      setErrorMessage("Ошибка при обновлении профиля: " + error.message);
    }
  };

  return (
    <div>
      {currentUser ? (
        <div className="pt-6 relative">
          {currentUser ? (
            <div className="flex flex-col gap-4 items-center text-white text-center">
              <Link to={"/"} className="absolute top-4 left-0 p-4 text-white">
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
              {currentUser.id === id ? (
                <div className="absolute top-4 right-0 p-4 text-white">
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 bg-gray-800 rounded hover:bg-neutral-800 active:bg-neutral-700"
                  >
                    Выйти
                  </button>
                </div>
              ) : null}

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <img
                    className="w-24 h-24 rounded-full object-cover"
                    src={profileImage}
                    alt="profile"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-2xl">{username}</span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="flex flex-col items-center gap-3">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex flex-col group">
                      <label className="group-focus-within:text-blue-400">
                        Имя пользователя
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-3 py-2 bg-neutral-800 rounded"
                        placeholder="Введите новое имя пользователя"
                      />
                    </div>

                    <div className="flex flex-col group gap-1">
                      <label className="group-focus-within:text-blue-400">
                        Фото профиля
                      </label>
                      <input
                        type="text"
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        className="px-3 py-2 bg-neutral-800 rounded"
                        placeholder="Введите ссылку на изображение"
                      />
                    </div>

                    <div className="flex flex-col group gap-1">
                      <label className="group-focus-within:text-blue-400">
                        Почта
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3 py-2 bg-neutral-800 rounded"
                        placeholder="Введите новый email"
                      />
                    </div>

                    <div className="flex flex-col group gap-1">
                      <label className="group-focus-within:text-blue-400">
                        Пароль
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-3 py-2 bg-neutral-800 rounded"
                        placeholder="Введите новый пароль"
                      />
                    </div>

                    <div className="flex gap-4 mt-3">
                      <button
                        onClick={handleSaveClick}
                        className="px-3 py-2 bg-green-500 rounded hover:bg-green-600"
                      >
                        Сохранить
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="px-3 py-2 bg-red-500 rounded hover:bg-red-600"
                      >
                        Отменить
                      </button>
                    </div>
                  </div>
                ) : currentUser.id === id ? (
                  <button
                    onClick={handleEditClick}
                    className="px-3 py-2 bg-gray-800 rounded hover:bg-neutral-800 active:bg-neutral-700"
                  >
                    Редактировать
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <p>Загрузка...</p>
          )}

          <div className="text-white mt-10">
            {currentUser.id === id ? (
              <Link
                to={`/profile/${currentUser?.id}/add-video`}
                className="text-white px-3 py-2 bg-gray-800 rounded hover:bg-neutral-800 active:bg-neutral-700"
              >
                Добавить видео
              </Link>
            ) : null}

            <h1 className="my-5 ">Видео пользователя</h1>
            <UserVideos userId={id} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center min-h-screen justify-center">
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
          <p className="text-center">
            Войдите в аккаунт, чтобы просматривать аккаунты пользователей
          </p>
          <Link
            to="/login"
            className="px-3 py-2 bg-gray-800 rounded hover:bg-neutral-800 active:bg-neutral-700 w-auto"
          >
            Войти
          </Link>
        </div>
      )}
    </div>
  );
}
