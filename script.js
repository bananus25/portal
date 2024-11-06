async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    const tableBody = document.querySelector('#usersTable tbody');

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.telegramId}</td>
            <td>${user.role}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Вызываем функцию для загрузки данных при загрузке страницы
window.onload = fetchUsers;