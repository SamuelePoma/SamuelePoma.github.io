const CACHE_NAME = "site-cache-v1";
const urlsToCache = [
    "site/html/index.html",
    "site/html/blog.html",
    "site/html/components/header.html",
    "site/html/components/footer.html",
    "site/html/projects.html",
    "site/html/aboutme.html",
    "site/html/404.html",
    "site/html/js/loadComponents.js"
];

// Install event - Cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache");
                return Promise.all(
                    urlsToCache.map(async (url) => {
                        try {
                            const response = await fetch(url);
                            if (!response.ok) {
                                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
                            }
                            return await cache.put(url, response);
                        } catch (error) {
                            return console.error(error);
                        }
                    })
                );
            })
    );
});

// Activate event - Clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event - Serve from cache if available
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
