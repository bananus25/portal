// Функция для получения Telegram ID из URL (например, из параметра запроса)
function getTelegramIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('telegramId');
}

// Функция для отображения результата
async function displayRole() {
    const telegramId = getTelegramIdFromUrl();
    if (!telegramId) {
        document.getElementById('result').innerText = 'Telegram ID не найден';
        return;
    }

    const response = await fetch(`/role/${telegramId}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('result').innerText = `ID: ${data.id}, Роль: ${data.role}`;
    } else {
        document.getElementById('result').innerText = `Ошибка: ${data.message}`;
    }
}

// Вызываем функцию для отображения роли при загрузке страницы
window.onload = displayRole;