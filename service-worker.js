const CACHE_NAME = 'cv-cache-v1';
const urlsToCache = [
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
