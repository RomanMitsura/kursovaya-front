import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useVideo } from "../context/VideoContext";
import { useAuth } from "../context/AuthContext";

export default function VideoPage() {
  const { id } = useParams();
  const { videos, addComment, deleteComment, deleteVideo } = useVideo(); // Добавлен deleteVideo
  const { users, currentUser } = useAuth();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const foundVideo = videos.find((video) => video.id.toString() === id);
    if (foundVideo) {
      setVideo(foundVideo);
      const foundUser = users.find((user) => user.id === foundVideo.userId);
      setUser(foundUser);
    }
  }, [id, videos, users]);

  if (!video || !user) {
    return <div>Загрузка...</div>;
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(video.id, commentText);
      setCommentText("");
    }
  };

  const handleDeleteComment = async (commentIndex) => {
    try {
      await deleteComment(video.id, commentIndex);
      const updatedComments = video.comments.filter(
        (_, index) => index !== commentIndex
      );
      setVideo({ ...video, comments: updatedComments });
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };

  const handleDeleteVideo = async () => {
    try {
      await deleteVideo(video.id); // Удаляем видео с сервера
      navigate("/"); // Переходим на главную страницу после удаления
    } catch (error) {
      console.error("Ошибка при удалении видео:", error);
    }
  };

  return (
    <div className="flex relative justify-center items-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute top-0 xl:top-4 left-0 py-4 xl:px-4 text-white"
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
      <div className="text-white flex flex-col py-6 max-w-3xl w-full mt-10 md:mt-10">
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

        {/* Кнопка удаления видео */}
        {currentUser.id === video.userId && (
          <button
            onClick={handleDeleteVideo}
            className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Удалить видео
          </button>
        )}

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
              {video.comments.map((comment) => (
                <div
                  className="flex items-center justify-between border-b border-gray-300"
                  key={comment.id}
                >
                  <li className="p-2 ">
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
                  {currentUser.id === video.userId ||
                  currentUser.id === comment.userId ? (
                    <div>
                      <button onClick={() => handleDeleteComment(comment.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 hover:stroke-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                </div>
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
