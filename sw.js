/* Offline app shell cache. Bump the version after changing assets. */
const CACHE_NAME = 'training-tracker-static-v1';
const APP_FILES = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(names.filter(name => name.startsWith('training-tracker-static-') && name !== CACHE_NAME).map(name => caches.delete(name)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const scope = new URL(self.registration.scope);
  if(url.origin!==scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  event.respondWith((async()=>{
    try {
      const response=await fetch(event.request);
      if(response && response.ok && response.type === 'basic'){
        const copy=response.clone();
        try { const cache=await caches.open(CACHE_NAME); await cache.put(event.request,copy); } catch(_) { /* still return network response */ }
      }
      return response;
    } catch(_) {
      return (await caches.match(event.request)) ||
        (event.request.mode==='navigate' ? await caches.match('./index.html') : Response.error());
    }
  })());
});
