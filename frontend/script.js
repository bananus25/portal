async function fetchUsers() {
    const response = await fetch('https://backend-exx1x3451-bananus25s-projects.vercel.app');
    const users = await response.json();
    const tableBody = document.querySelector('#usersTable tbody');

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.additionalInfo.firstName}</td>
            <td>${user.additionalInfo.lastName}</td>
            <td>${user.role}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Вызываем функцию для загрузки данных при загрузке страницы
window.onload = fetchUsers;