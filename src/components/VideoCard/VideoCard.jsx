import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import profileImg from "./../../assets/profileImg.jpeg";

export default function VideoCard({ video }) {
  const { users } = useAuth();
  const [user, setUser] = useState(null); // Состояние для хранения данных о пользователе
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки данных о пользователе

  // Используем useEffect для асинхронной загрузки данных
  useEffect(() => {
    const fetchUser = async () => {
      // Эмулируем асинхронную загрузку данных пользователя
      const userData = users.find((user) => user.id === video.userId);
      setUser(userData); // Обновляем состояние с данными пользователя
      setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
    };

    fetchUser();
  }, [users, video.userId]); // Эффект зависит от users и video.userId

  // Если данные еще загружаются, можно отобразить индикатор загрузки
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если данные о пользователе не найдены, можно отобразить ошибку
  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className=" rounded-lg rounded-b-none hover:border-b hover:shadow-white overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={video.thumbnail}
        alt={video.title}
      />
      <div className="p-4 flex gap-2 items-center">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user.profileImage ? user.profileImage : profileImg}
          alt={user.username}
        />
        <div>
          <h2 className="text-xl font-semibold">{video.title}</h2>
          <p className="text-gray-600">{user.username}</p>
        </div>
      </div>
    </div>
  );
}
