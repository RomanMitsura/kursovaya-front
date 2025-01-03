import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

// const API_URL = "https://json-server-repo.onrender.com/videos";
const URL_LOCAL = "https://json-server-repo.onrender.com/videos";

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
      text: commentText,
      username: currentUser.username,
      profileImage: currentUser.profileImage,
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

  return (
    <VideoContext.Provider value={{ videos, addVideo, addComment }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
