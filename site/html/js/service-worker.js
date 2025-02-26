// name of the cache
const CACHE_NAME = 'portfolio-cache-v1';

// file to put in cache
const urlsToCache = [
  '/',
  '/index.html',
  '/aboutMe.html',
  '/projects.html',
  '/blog.html',
  '/js/loadComponents.js',
  '/assets/CV_Samuele_Poma.pdf'
];

// install the service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
      return cache.addAll(urlsToCache);
    })
  );
});

// fetch requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
