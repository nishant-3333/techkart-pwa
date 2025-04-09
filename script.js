// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log("✅ Service Worker Registered"))
      .catch(err => console.error("❌ SW Registration Failed:", err));
  });
}

// Request Notification permission
document.getElementById('notify').addEventListener('click', () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("TechKart", {
        body: "Notifications are now enabled!",
        icon: "icon-192.png"
      });
    }
  });
});
