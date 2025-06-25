const CACHE_NAME = 'sapa-docs-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.webmanifest',
  'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch cached resources
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync (untuk pengiriman data saat online kembali)
self.addEventListener('sync', event => {
  if (event.tag === 'submit-form') {
    event.waitUntil(submitFormData());
  }
});

async function submitFormData() {
  // Logika pengiriman data
  console.log('Data berhasil dikirim setelah koneksi pulih');
}