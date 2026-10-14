const CACHE_NAME = 'rpg-cache-v2'; // 升級為 v2，強制清除舊暫存
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 安裝時立即啟動新版本
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 啟動時自動刪除舊版暫存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 攔截請求：改為「網絡優先 (Network First)」，斷網才用「暫存 (Cache)」
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 如果成功連上網絡，就把最新版本存入暫存
        if (response && response.status === 200) {
          let responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 如果斷網，才拿出暫存的舊版本
        return caches.match(event.request);
      })
  );
});
