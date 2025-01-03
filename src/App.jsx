// src/App.jsx
import AppRouter from "./router";
import { AuthProvider } from "./context/AuthContext";
import { VideoProvider } from "./context/VideoContext";

const App = () => {
  return (
    <div className="px-4 bg-gradient-to-tr text-white from-neutral-950 to-neutral-900 min-h-screen h-full">
      <div className=" max-w-[1920px] mx-auto">
        <AuthProvider>
          <VideoProvider>
            <AppRouter />
          </VideoProvider>
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
