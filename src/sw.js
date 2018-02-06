const VERSION = 1
const CACHE_NAME = `cache-v${VERSION}`
const STATIC_FILES = [
  '/assets/js/main.js',
  '/assets/css/main.css',
  '/assets/img/icons/about.svg',
  '/assets/img/icons/arrow_back.svg',
  '/assets/img/icons/twitter.svg',
  '/assets/img/icons/github.svg'
]

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(STATIC_FILES)
  })())
})

self.addEventListener('activate', event => {
  console.log('activate')
  event.waitUntil((async () => {
    const cachedFiles = await caches.keys()

    await Promise.all(cachedFiles.map(cacheFile => {
      if (cacheFile !== CACHE_NAME) {
        console.log('Removing Cached Files from Cache - ', cacheFile)
        return caches.delete(cacheFile)
      }
    }))
  })())
})

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.match(event.request)
    console.log('Cache:', cache)
    if (cache) return cache

    try {
      const response = await fetch(event.request)
      console.log('Response:', response)
      if (response) return response
    } catch (error) {
      throw error
    }
  })())
})
