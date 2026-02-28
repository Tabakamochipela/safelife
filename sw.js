// SaveLYF Service Worker — Offline Mode
// Caches map tiles and app shell for offline use

const CACHE_NAME = 'savelyf-v1.2';
const TILE_CACHE = 'savelyf-tiles-v1';

const APP_SHELL = [
  '/index.html',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
];

// Install — cache app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL.filter(url => !url.startsWith('http') || url.includes('cdnjs') || url.includes('fonts')));
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME && k !== TILE_CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch — network first for API, cache first for tiles
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Cache map tiles aggressively
  if (url.hostname.includes('basemaps.cartocdn.com') || url.hostname.includes('tile.openstreetmap')) {
    e.respondWith(
      caches.open(TILE_CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const response = await fetch(e.request);
          cache.put(e.request, response.clone());
          return response;
        } catch { return new Response('', { status: 404 }); }
      })
    );
    return;
  }

  // Network first for Firebase
  if (url.hostname.includes('firebase') || url.hostname.includes('firestore')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Cache first for app shell
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.status === 200) {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, resClone));
      }
      return res;
    }).catch(() => caches.match('/index.html')))
  );
});
