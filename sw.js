const CACHE_NAME = 'my-visit-card-cache-v3';
const OFFLINE_URL = '/offline.html';
const urlsToCache = [
  '/',
  '/index.html',
  OFFLINE_URL,
  '/styles.css',
  '/app.js',
  '/images/photo.jpg',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Кэшируем offline.html в первую очередь
        return cache.addAll([OFFLINE_URL, ...urlsToCache]);
      })
  );
});

self.addEventListener('fetch', event => {
  // Для навигационных запросов используем стратегию "Network falling back to cache"
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Если сеть недоступна, возвращаем offline.html
          return caches.match(OFFLINE_URL);
        })
    );
  } else {
    // Для остальных запросов сначала проверяем кэш
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});
