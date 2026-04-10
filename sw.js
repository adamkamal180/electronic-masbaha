const CACHE_NAME = 'masbaha-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 1. عند تثبيت التطبيق: قم بتحميل الملفات وتخزينها
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. عند فتح التطبيق: حاول جلب الملفات من الذاكرة للعمل بدون إنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش قم بإرجاعه، وإلا اطلبه من الإنترنت
        return response || fetch(event.request);
      })
  );
});

// 3. تنظيف الذاكرة القديمة إذا تم تحديث التطبيق
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
