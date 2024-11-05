// script.js
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
  
    tg.ready();
  
    const loginButton = document.getElementById('loginButton');
    const content = document.getElementById('content');
    const teachersList = document.getElementById('teachersList');
    const studentsList = document.getElementById('studentsList');
  
    loginButton.addEventListener('click', () => {
      // Отправляем запрос на авторизацию через бота
      tg.sendData('login');
    });
  
    tg.onEvent('dataReceived', (data) => {
      if (data === 'authorized') {
        // Показываем контент после авторизации
        content.style.display = 'block';
        loginButton.style.display = 'none';
  
        // Здесь можно добавить логику для получения списков преподавателей и учеников
        // Например, через fetch или другой метод
        const teachers = ['Преподаватель 1', 'Преподаватель 2', 'Преподаватель 3'];
        const students = ['Ученик 1', 'Ученик 2', 'Ученик 3'];
  
        teachers.forEach(teacher => {
          const li = document.createElement('li');
          li.textContent = teacher;
          teachersList.appendChild(li);
        });
  
        students.forEach(student => {
          const li = document.createElement('li');
          li.textContent = student;
          studentsList.appendChild(li);
        });
      }
    });
  });