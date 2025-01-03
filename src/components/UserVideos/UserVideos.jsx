import { useAuth } from "../../context/AuthContext";
import { useVideo } from "../../context/VideoContext";
import VideoCard from "../VideoCard/VideoCard";
import { Link } from "react-router-dom";

export default function UserVideos({ userId }) {
  const { videos } = useVideo();
  const { users, currentUser } = useAuth(); // Исправлено на правильный синтаксис
  const user = users?.find((user) => user.id === userId);

  if (!user || !videos) {
    return <div>Загрузка...</div>; // Покажем загрузку, если данные ещё не получены
  }

  const userVideos = videos.filter((video) => video.userId === user.id);

  return (
    <div>
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
        {userVideos.length > 0 ? (
          userVideos.map((video) => (
            <li key={video.id}>
              <Link className="flex justify-center" to={`/video/${video.id}`}>
                <VideoCard video={video} />
              </Link>
            </li>
          ))
        ) : (
          <li>Видео не найдены для этого пользователя</li>
        )}
      </ul>
    </div>
  );
}
