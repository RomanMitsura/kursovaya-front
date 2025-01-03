// src/router.jsx
// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import VideoPage from "./pages/VideoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./components/Profile/Profile.jsx";
import AddVideo from "./components/AddVideo/AddVideo.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/video/:id", element: <VideoPage /> },
  { path: "/profile/:id", element: <Profile /> },
  { path: "/profile/:id/add-video", element: <AddVideo /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
