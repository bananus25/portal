const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');

const PORT = 3000;

// Устанавливаем статическую папку
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера HTTP
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// Запуск сервера HTTPS
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('Сервер запущен на https://localhost');
});