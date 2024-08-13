FROM python:3.8

# Копируем файл requirements.txt в контейнер
COPY requirements.txt requirements.txt

# Устанавливаем зависимости из файла requirements.txt
RUN pip install -r requirements.txt

# Копируем остальные файлы в контейнер
COPY . .

## Запускаем приложение
CMD [ "python", "main.py" ]
#CMD gunicorn main:app -- workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
