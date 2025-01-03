// utils/saveData.js
import fs from "fs";
import path from "path";

// Функция для записи данных в файл
export const saveData = (fileName, data) => {
  const filePath = path.resolve("src/data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Перезаписываем файл
};
