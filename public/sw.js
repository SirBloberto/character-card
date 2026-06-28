const CACHE = 'cf-v1';
const FONTS = 'cf-fonts-v1';

const SHELL = ['/', '/dice-d20.svg', '/manifest.json', '/og-image.svg'];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(SHELL))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE && k !== FONTS).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    const { request } = e;
    const url = new URL(request.url);

    if (request.method !== 'GET') return;
    if (url.pathname.startsWith('/api/')) return;

    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        e.respondWith(
            caches.open(FONTS).then(cache =>
                cache.match(request).then(hit =>
                    hit ?? fetch(request).then(res => {
                        cache.put(request, res.clone());
                        return res;
                    })
                )
            )
        );
        return;
    }

    e.respondWith(
        caches.open(CACHE).then(cache =>
            cache.match(request).then(cached => {
                const fresh = fetch(request)
                    .then(res => {
                        if (res.ok) cache.put(request, res.clone());
                        return res;
                    })
                    .catch(() => cached);
                return cached ?? fresh;
            })
        )
    );
});
