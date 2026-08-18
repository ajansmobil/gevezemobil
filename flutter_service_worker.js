// Kill-switch: eski Flutter PWA worker'i kaldirir; istemci guncel surumu agdan yukler.
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    if (self.clients && self.clients.claim) {
      await self.clients.claim();
    }
    if (typeof caches !== 'undefined') {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    }
    await self.registration.unregister();
    var windows = await self.clients.matchAll({ type: 'window' });
    await Promise.all(windows.map(function (c) { return c.navigate(c.url); }));
  })());
});
