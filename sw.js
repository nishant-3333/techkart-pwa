// Cache name
const CACHE_NAME = "techkart-cache-v2";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/icon-192.png",
  "/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate
self.addEventListener("activate", event => {
  console.log("[SW] Activate event");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch (Cache-first Strategy)
self.addEventListener("fetch", event => {
  console.log("[SW] Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Sync Event
self.addEventListener("sync", event => {
  if (event.tag === 'sync-message') {
    console.log("[SW] Background sync triggered!");
    // Place your custom sync logic here
  }
});

// Push Event
self.addEventListener("push", event => {
  if (event.data) {
    const data = event.data.json();
    console.log("[SW] Push Received:", data);
    event.waitUntil(
      self.registration.showNotification("TechKart Notification", {
        body: data.message,
        icon: "icon-192.png"
      })
    );
  }
});
