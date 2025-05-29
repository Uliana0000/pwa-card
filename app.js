if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован:', registration);
            })
            .catch(error => {
                console.error('Ошибка регистрации Service Worker:', error);
            });
    });
}

// Проверка подключения к интернету
window.addEventListener('offline', () => {
    window.location.href = 'offline.html';
});

// Проверяем при загрузке
if (!navigator.onLine) {
    window.location.href = 'offline.html';
}

document.getElementById('GitHubBtn').addEventListener('click', () => {
    const githubQR = 'https://github.com/Uliana0000?tab=repositories';
    generateQRCode(githubQR);
});

document.getElementById('telegramBtn').addEventListener('click', () => {
    const telegramQR = 'https://t.me';
    generateQRCode(telegramQR);
});

document.getElementById('emailBtn').addEventListener('click', () => {
    const emailQR = 'mailto:213776@edu.fa.ru';
    generateQRCode(emailQR);
});

function generateQRCode(data) {
    const qrcodeImg = document.getElementById('qrcode');
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=200x200`;

    qrcodeImg.src = qrCodeUrl;
    qrcodeImg.style.display = 'block';
}