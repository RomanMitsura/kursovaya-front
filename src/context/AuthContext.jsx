import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Состояние для всех пользователей
  const [currentUser, setCurrentUser] = useState(null); // Текущий пользователь
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const URL = "https://json-server-repo.onrender.com";
  useEffect(() => {
    // При загрузке страницы восстанавливаем данные пользователя из localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Загрузка всех пользователей при монтировании
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URL}/users`);
        const usersData = await response.json();
        setUsers(usersData); // Сохраняем всех пользователей
      } catch (err) {
        console.error("Ошибка при загрузке пользователей:", err);
      }
    };

    fetchUsers();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        setCurrentUser(user); // Сохраняем пользователя в состоянии
        localStorage.setItem("user", JSON.stringify(user)); // Сохраняем в localStorage
      } else {
        setError("Неверное имя пользователя или пароль");
      }
    } catch (err) {
      setError("Ошибка при запросе данных о пользователе");
      console.error("Ошибка входа:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user"); // Убираем данные из localStorage
  };

  return (
    <AuthContext.Provider
      value={{ users, currentUser, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
