const VERSION = 1
const CACHE_NAME = `cache-v${VERSION}`
const STATIC_FILES = ['/assets/js/main.js', '/assets/css/main.css']

if (
  'ServiceWorkerGlobalScope' in self &&
  self instanceof ServiceWorkerGlobalScope
) {
  self.addEventListener('install', event => {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(CACHE_NAME)
        await cache.addAll(STATIC_FILES)
      })()
    )
  })

  self.addEventListener('activate', event => {
    event.waitUntil(
      (async () => {
        const cachedFiles = await caches.keys()

        await Promise.all(
          cachedFiles.map(cacheFile => {
            if (cacheFile !== CACHE_NAME) {
              return caches.delete(cacheFile)
            }
          })
        )
      })()
    )
  })

  self.addEventListener('fetch', event => {
    if (
      event.request.cache === 'only-if-cached' &&
      event.request.mode !== 'same-origin'
    ) {
      return
    }

    event.respondWith(
      (async () => {
        const cache = await caches.match(event.request)
        if (cache) return cache

        try {
          const response = await fetch(event.request)
          if (response) return response
        } catch (error) {
          throw error
        }
      })()
    )
  })
} else if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(error => {
      console.error(error)
    })
  })
}
