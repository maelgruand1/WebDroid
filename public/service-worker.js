// public/service-worker.js

self.addEventListener('install', (event) => {
  console.log('✅ Service Worker installé.');
  self.skipWaiting(); // Active immédiatement (optionnel)
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activé.');
});

self.addEventListener('fetch', (event) => {
  console.log('🔎 Fetch intercepté :', event.request.url);
});
