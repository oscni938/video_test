const cacheName = "stat";//jmeter för bench

const cacheAssets = [
  'video_site.html',
  'style.css',
  'site.js',
  'Everytime_I_play_Skyrim.mp4',
  'SLAV_KING_Boris_vs_DJ_Blyatman.mp4',
  'What_is_a_service_workers.mp4'
    ];

//call install
self.addEventListener('install',(e) =>
{
    console.log("service worker: installed");
    e.waitUntil(
      caches
      .open(cacheName)
        .then(cache =>
        {
          console.log("service worker: Caching Files");
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

//call activate
self.addEventListener('activate',(e) =>
{
    console.log("service worker: activated");
    //remove unwanted cache
    e.waitUntil(
      caches.keys().then(cacheName =>
      {
        return Promise.all(
          cacheName.map(cache =>
          {
            if (cache != cacheName)
            {
              console.log("service worker: clearing old cache");
              return caches.delete(cache);
            }
          })
        )
      })
    );
});

//call fetch
self.addEventListener('fetch', e =>
{
  console.log("service worker: fetching");
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
