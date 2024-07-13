# Usa una imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de requisitos y el código de la aplicación al contenedor
COPY requirements.txt requirements.txt
COPY . .

# Instala las dependencias
RUN pip install -r requirements.txt

# Expone el puerto en el que correrá la aplicación
EXPOSE 5000

# Comando para correr la aplicación
CMD ["python", "app.py"]
