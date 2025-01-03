// pages/Home/Home.jsx
import Header from "../components/Header/Header";
import AllVideos from "../components/AllVideos/AllVideos";
import { SearchProvider } from "../context/SearchContext"; // Импортируем контекст поиска

export default function Home() {
  return (
    <SearchProvider>
      <Header />
      <AllVideos />
    </SearchProvider>
  );
}
