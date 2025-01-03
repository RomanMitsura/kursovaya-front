import { useState } from "react";
import { useVideo } from "../../context/VideoContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AddVideo() {
  const { addVideo } = useVideo();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Проверка на обязательные поля
    if (!title || !videoUrl) {
      setError("Название и ссылки на обложку и видео обязательны.");
      return;
    }

    // Создание объекта видео
    const videoData = {
      title,
      description,
      thumbnail,
      videoUrl,
      comments: [],
    };

    try {
      await addVideo(videoData);
      setSuccess(true);
      setTitle("");
      setDescription("");
      setThumbnail("");
      setVideoUrl("");
    } catch (err) {
      setError("Ошибка при добавлении видео. Попробуйте снова.", err);
    }
  };

  return (
    <div className="min-h-screen relative text-white flex items-center justify-center p-6">
      <Link
        to={`/profile/${currentUser.id}`}
        className="absolute top-0 left-0 p-4 text-white"
      >
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
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Добавить Видео</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">Видео успешно добавлено!</p>
        )}

        <div className="flex flex-col gap-1 group">
          <label htmlFor="title" className="group-focus-within:text-blue-400">
            Название
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название видео"
            className="w-full px-3 py-2 bg-neutral-800 rounded"
          />
        </div>

        <div className="flex flex-col gap-1 group">
          <label
            htmlFor="description"
            className="group-focus-within:text-blue-400"
          >
            Описание
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание (необязательно)"
            className="w-full px-3 py-2 bg-neutral-800 rounded"
          />
        </div>

        <div className="flex flex-col gap-1 group">
          <label
            htmlFor="thumbnail"
            className="group-focus-within:text-blue-400"
          >
            Ссылка на обложку
          </label>
          <input
            id="thumbnail"
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Введите ссылку на обложку"
            className="w-full px-3 py-2 bg-neutral-800 rounded"
          />
        </div>

        <div className="flex flex-col gap-1 group">
          <label
            htmlFor="videoUrl"
            className="group-focus-within:text-blue-400"
          >
            Ссылка на видео
          </label>
          <input
            id="videoUrl"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Введите ссылку на видео"
            className="w-full px-3 py-2 bg-neutral-800 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
        >
          Добавить
        </button>
      </form>
    </div>
  );
}
