self.addEventListener('install', (e) => { self.skipWaiting() }) 
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()) })
self.addEventListener('push', function(event) {
    const data = event.data.json()
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'images/icon-192.png'
        })
    )
})