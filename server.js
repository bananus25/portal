const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const https = require('https');

const HTTP_PORT = 3000;
const HTTPS_PORT = 443;

// Устанавливаем статическую папку
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера HTTP
app.listen(HTTP_PORT, () => {
  console.log(`Сервер запущен на http://localhost:${HTTP_PORT}`);
});

// Запуск сервера HTTPS
const options = {
  key: fs.readFileSync('key.posn'),
  cert: fs.readFileSync('cert.posn')
};

https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`Сервер запущен на https://localhost:${HTTPS_PORT}`);
});