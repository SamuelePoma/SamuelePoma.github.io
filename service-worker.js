// service-worker.js

const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/aboutMe.html',
  '/projects.html',
  '/blog.html',
  '/assets/CV_Samuele_Poma.pdf',
  // Add other assets, CSS and JS as needed
];

// Install event: cache each URL individually to handle errors gracefully
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        // Add each URL separately and catch errors for any that fail
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(function(error) {
              console.error('Failed to cache:', url, error);
              // Optionally, you can decide to ignore the error or handle it differently
            });
          })
        );
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
