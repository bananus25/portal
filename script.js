document.getElementById('checkRoleForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const telegramId = document.getElementById('telegramId').value;
    const response = await fetch(`/role/${telegramId}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('result').innerText = `Роль: ${data.role}`;
    } else {
        document.getElementById('result').innerText = `Ошибка: ${data.message}`;
    }
});