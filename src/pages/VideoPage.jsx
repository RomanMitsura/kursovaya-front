import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useVideo } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";

export default function VideoPage() {
  const { id } = useParams();
  const { videos, addComment } = useVideo();
  const { users, currentUser } = useAuth();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [commentText, setCommentText] = useState("");

  // Загружаем данные о видео и пользователе только один раз при монтировании компонента
  useEffect(() => {
    const foundVideo = videos.find((video) => video.id.toString() === id);
    if (foundVideo) {
      setVideo(foundVideo);
      const foundUser = users.find((user) => user.id === foundVideo.userId);
      setUser(foundUser);
    }
  }, [id, videos, users]); // Обновление зависит только от id, videos и users

  // Проверка на наличие видео и пользователя
  if (!video || !user) {
    return <div>Загрузка...</div>;
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(video.id, commentText);
      setCommentText(""); // Очищаем поле ввода после добавления комментария
    }
  };

  return (
    <div className="flex relative justify-center items-center">
      <Link
        onClick={() => navigate(-1)}
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
      <div className="text-white flex flex-col py-6 max-w-3xl w-full">
        <div>
          <video className="w-full" controls>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="my-4 flex flex-col gap-2 items-start text-left">
          <p className="font-black text-3xl">{video.title}</p>
          <div className="flex items-center gap-2">
            <Link to={`../profile/${video.userId}`}>
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            <p>{user.username}</p>
          </div>
          <p className="font-light text-lg">{video.description}</p>
        </div>

        <div className="mt-4 text-left">
          <h3 className="text-xl">Комментарии:</h3>
          {currentUser ? (
            <div className="my-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите комментарий..."
                className="w-full px-3 py-2 bg-neutral-800 rounded"
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-3 py-2 bg-gray-800 rounded hover:bg-neutral-800 active:bg-neutral-700"
              >
                Добавить комментарий
              </button>
            </div>
          ) : (
            <p className="my-4 font-thin">
              Авторизуйтесь что б оставлять комментарии
            </p>
          )}

          {video.comments && video.comments.length > 0 ? (
            <ul>
              {video.comments.map((comment, index) => (
                <li key={index} className="p-2 border-b border-gray-300">
                  <div className="flex gap-2 items-center">
                    <img
                      src={comment.profileImage}
                      alt="Profile"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="font-semibold">{comment.username}</span>
                  </div>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-extralight">Нет комментариев</p>
          )}
        </div>
      </div>
    </div>
  );
}
