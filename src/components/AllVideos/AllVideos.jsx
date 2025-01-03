// components/AllVideos/AllVideos.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../context/VideoContext";
import { useSearch } from "../../context/SearchContext"; // Импортируем контекст поиска
import VideoCard from "../VideoCard/VideoCard";

export default function AllVideos() {
  const { videos } = useVideo();
  const { searchQuery } = useSearch(); // Получаем searchQuery из контекста
  const [filteredVideos, setFilteredVideos] = useState(videos);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredVideos(videos); // Если запрос пустой, показываем все видео
    } else {
      setFilteredVideos(
        videos.filter(
          (video) =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтруем по названию
        )
      );
    }
  }, [searchQuery, videos]); // Срабатывает при изменении searchQuery или videos

  return (
    <ul className="grid grid-cols-4 gap-x-4 gap-y-4 text-white">
      {filteredVideos.length === 0 ? (
        <p className="text-center text-white">Нет результатов</p>
      ) : (
        filteredVideos.map((video) => (
          <li key={video.id}>
            <Link to={`/video/${video.id}`}>
              <VideoCard video={video} />
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
