# Используем официальный образ Node.js версии 14.x
FROM node:14-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json в контейнер
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Фиксируем права доступа для react-scripts
RUN chmod +x node_modules/.bin/react-scripts

# Собираем проект для production
RUN npm run build

# Используем официальный образ Nginx
FROM nginx:stable-alpine

# Копируем собранные файлы React в директорию, откуда Nginx будет отдавать статические файлы
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Экспортируем порт 80, чтобы Nginx мог слушать его
EXPOSE 80

# Команда для запуска Nginx в режиме демона
CMD ["nginx", "-g", "daemon off;"]
