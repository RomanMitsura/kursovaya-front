import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const URL_LOCAL = "https://json-server-repo.onrender.com/videos";
// const URL_LOCAL = "http://localhost:3000/videos";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(URL_LOCAL);
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Функция добавления комментария
  const addComment = async (videoId, commentText) => {
    const newComment = {
      id: Date.now(), // Уникальный ID комментария
      text: commentText,
      username: currentUser.username,
      profileImage: currentUser.profileImage,
      userId: currentUser.id, // ID текущего пользователя
    };

    try {
      const response = await fetch(`${URL_LOCAL}/${videoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: [
            ...videos.find((video) => video.id === videoId).comments,
            newComment,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении комментария");
      }

      const updatedVideo = await response.json();

      setVideos((prev) =>
        prev.map((video) => (video.id === videoId ? updatedVideo : video))
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (videoId, commentId) => {
    try {
      // Получаем данные видео
      const videoResponse = await fetch(`${URL_LOCAL}/${videoId}`);
      if (!videoResponse.ok) {
        throw new Error(`Ошибка загрузки видео: ${videoResponse.status}`);
      }

      const video = await videoResponse.json();

      // Удаляем комментарий по ID
      const updatedComments = video.comments.filter(
        (comment) => comment.id !== commentId
      );

      // Отправляем обновлённые данные обратно
      const updateResponse = await fetch(`${URL_LOCAL}/${videoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: updatedComments }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Ошибка обновления видео: ${updateResponse.status}`);
      }

      // Обновляем локальное состояние
      setVideos((prev) =>
        prev.map((video) =>
          video.id === videoId ? { ...video, comments: updatedComments } : video
        )
      );
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };

  // Функция добавления нового видео
  const addVideo = async (videoData) => {
    try {
      const videoWithUser = { ...videoData, userId: currentUser.id };

      const response = await fetch(URL_LOCAL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoWithUser),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении видео");
      }

      const newVideo = await response.json();
      setVideos((prev) => [...prev, newVideo]);
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      // Отправляем запрос на удаление видео по ID
      const response = await fetch(`${URL_LOCAL}/${videoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении видео");
      }

      // Удаляем видео из локального состояния
      setVideos((prev) => prev.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <VideoContext.Provider
      value={{ videos, addVideo, addComment, deleteComment, deleteVideo }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
