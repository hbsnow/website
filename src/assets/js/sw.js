import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
// import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate'

const VERSION = 1
const CACHE_NAME = `cache-v${VERSION}`
const STATIC_FILES = [
  '/assets/img/icons/about.svg',
  '/assets/img/icons/arrow_back.svg',
  '/assets/img/icons/twitter.svg',
  '/assets/img/icons/github.svg'
]

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const registration = runtime.register()

    registerEvents(registration, {
      onInstalled: () => {
        console.log('onInstalled')
      },
      onUpdateReady: () => {
        console.log('onUpdateReady')
      },
      onUpdating: () => {
        console.log('onUpdating')
      },
      onUpdateFailed: () => {
        console.log('onUpdateFailed')
      },
      onUpdated: () => {
        console.log('onUpdated')
      }
    })
  })
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(STATIC_FILES)
  })())
})

self.addEventListener('fetch', event => {
  console.log(caches)
})
