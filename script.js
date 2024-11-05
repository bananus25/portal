document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    if (!tg) {
        console.error('Telegram WebApp is not available');
        return;
    }

    tg.ready();

    const loginButton = document.getElementById('loginButton');
    const content = document.getElementById('content');
    const studentsList = document.getElementById('students-list');
    const teachersList = document.getElementById('teachers-list');

    loginButton.addEventListener('click', () => {
        console.log('Login button clicked');
        // Отправляем запрос на авторизацию через бота
        tg.sendData('login');
    });

    tg.onEvent('dataReceived', (data) => {
        console.log('Data received:', data);
        if (data === 'authorized') {
            // Вызываем функцию для обработки авторизации
            handleAuthorization();
        }
    });

    // Функция для обработки авторизации
    function handleAuthorization() {
        const userId = tg.initDataUnsafe.user.id;
        console.log('User ID:', userId);
        fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.status === 'authorized') {
                // Показываем контент после авторизации
                content.style.display = 'block';
                loginButton.style.display = 'none';
                // Отображаем списки преподавателей и учеников
                displayLists(data.userData);
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка при авторизации:', error);
        });
    }

    // Функция для отображения списков
    function displayLists(userData) {
        console.log('Displaying lists for user data:', userData);
        // Очищаем списки перед добавлением новых элементов
        studentsList.innerHTML = '';
        teachersList.innerHTML = '';

        // Добавляем студентов
        userData.students.forEach(student => {
            const li = document.createElement('li');
            li.textContent = `${student.name}, ${student.age} лет`;
            studentsList.appendChild(li);
        });

        // Добавляем преподавателей
        userData.teachers.forEach(teacher => {
            const li = document.createElement('li');
            li.textContent = `${teacher.name}, предмет: ${teacher.subject}`;
            teachersList.appendChild(li);
        });
    }
});