# Usa una imagen base de Python
FROM python:3.9

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo requirements.txt al contenedor
COPY requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que correrá la aplicación
EXPOSE 5000

# Comando para correr la aplicación
CMD ["python", "app.py"]
    