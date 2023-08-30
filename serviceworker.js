const staticCalculatorPWA = "calculator-pwa-site-v1"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/calculation.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticCalculatorPWA).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })