const CACHE_NAME = 'quiz-coach-v1';
const ASSETS = [
  '/training-quiz-coach/',
  '/training-quiz-coach/index.html',
  '/training-quiz-coach/manifest.json',
  '/training-quiz-coach/icons/icon-192.png',
  '/training-quiz-coach/icons/icon-512.png',
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
