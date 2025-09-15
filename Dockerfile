# 1. Используем Node.js как базовый образ
FROM node:18

# 2. Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# 3. Копируем package.json и package-lock.json
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем всё остальное
COPY . .

# 6. Собираем приложение
RUN npm run build

# 7. Устанавливаем сервер (serve) для отдачи статических файлов
RUN npm install -g serve

# 8. Указываем порт
EXPOSE 5173

# 9. Команда запуска production-сервера
CMD ["serve", "-s", "dist", "-l", "5173"]
