const CACHE_NAME = 'quiz-coach-v4';
const ASSETS = [
  '/Training-Quiz-Coach/',
  '/Training-Quiz-Coach/index.html',
  '/Training-Quiz-Coach/manifest.json',
  '/Training-Quiz-Coach/icons/icon-192.png',
  '/Training-Quiz-Coach/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
