var cacheName = 'cvPWA-v-1-31';
var filesToCache = [
  './',
  './index.html',
  './scripts/app.js',
  './scripts/w3data.js',
  './styles/materialize/materialize.min.css',
  './styles/custom.css',
  './manifest.json',
  './images/ic_refresh_white_24px.svg',
  './images/macha.png',
  './images/bg.jpg',
  './images/pic01.jpg',
  './images/pic02.jpg',
  '.images/pic03.jpg',
  './styles/font-awesome/fonts/fontawesome-webfont.woff2',
  './styles/font-awesome/css/font-awesome.min.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});