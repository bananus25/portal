// script.js
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
  
    tg.ready();
  
    const loginButton = document.getElementById('loginButton');
    const content = document.getElementById('content');
    const teachersList = document.getElementById('teachers-list');
    const studentsList = document.getElementById('students-list');
  
    loginButton.addEventListener('click', () => {
      // Отправляем запрос на авторизацию через бота
      tg.sendData('login');
    });
  
    tg.onEvent('dataReceived', (data) => {
      if (data === 'authorized') {
        // Вызываем функцию для обработки авторизации
        handleAuthorization();
      }
    });
  
    // Функция для обработки авторизации
    function handleAuthorization() {
      const userId = tg.initDataUnsafe.user.id;
      fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      })
      .then(response => response.json())
      .then(data => {
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