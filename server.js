const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb+srv://Nikita:tAeIIEPR6ZYW7aQ1@cluster0.jyarv.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Определение схемы и модели
const userSchema = new mongoose.Schema({
    telegramId: String,
    role: String
});

const User = mongoose.model('User', userSchema);

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для получения всех пользователей
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});