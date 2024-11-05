const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = {
    // Пример данных пользователей
    123456789: {
        id: 123456789,
        role: 'student',
        students: [
            { name: 'Иван Иванов', age: 20 },
            { name: 'Петр Петров', age: 21 }
        ],
        teachers: []
    },
    987654321: {
        id: 987654321,
        role: 'teacher',
        students: [],
        teachers: [
            { name: 'Анна Сидорова', subject: 'Математика' },
            { name: 'Елена Иванова', subject: 'Физика' }
        ]
    }
};

app.post('/auth', (req, res) => {
    const { userId } = req.body;

    if (!userId || !users[userId]) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }

    if (users[userId].role) {
        return res.json({ status: 'authorized', userData: users[userId] });
    } else {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});