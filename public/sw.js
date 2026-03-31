// Z3ymo Service Worker — PWA offline support
// Strategy: Cache-first for static assets, Network-first for pages/API

const CACHE_VERSION = 'z3ymo-v1'
const STATIC_CACHE  = `${CACHE_VERSION}-static`
const PAGE_CACHE    = `${CACHE_VERSION}-pages`
const IMAGE_CACHE   = `${CACHE_VERSION}-images`

const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
]

const CACHE_LIMITS = {
  [PAGE_CACHE]:  { max: 30,  ttl: 24 * 60 * 60 },      // 30 pages, 24h
  [IMAGE_CACHE]: { max: 60,  ttl: 7 * 24 * 60 * 60 },  // 60 images, 7d
}

// ─── Install: pre-cache shell ──────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(STATIC_ASSETS)
    ).then(() => self.skipWaiting())
  )
})

// ─── Activate: clean old caches ───────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('z3ymo-') && !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

// ─── Fetch strategy ───────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET, cross-origin, and API requests
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/')) return
  if (url.pathname.startsWith('/_next/webpack-hmr')) return

  // Images — cache-first, long TTL
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE))
    return
  }

  // Static Next.js assets — cache-first
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // Pages — stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request, PAGE_CACHE))
})

// ─── Cache strategies ─────────────────────────
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
      await trimCache(cacheName)
    }
    return response
  } catch {
    return new Response('Offline', { status: 503 })
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request).then(async (response) => {
    if (response.ok) {
      cache.put(request, response.clone())
      await trimCache(cacheName)
    }
    return response
  }).catch(() => null)

  return cached || await fetchPromise || offlineFallback()
}

function offlineFallback() {
  return caches.match('/offline') || new Response(
    '<html><body><h1>You\'re offline</h1><p>Please check your connection.</p></body></html>',
    { headers: { 'Content-Type': 'text/html' } }
  )
}

async function trimCache(cacheName) {
  const limit = CACHE_LIMITS[cacheName]
  if (!limit) return

  const cache = await caches.open(cacheName)
  const keys  = await cache.keys()
  if (keys.length > limit.max) {
    await cache.delete(keys[0])
  }
}
