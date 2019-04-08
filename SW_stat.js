const cacheName = "s";

const cacheAssets = [
  'video_site.html',
  'style.css',
  'site.js',
  'Everytime_I_play_Skyrim.mp4',
  'SLAV_KING_Boris_vs_DJ_Blyatman.mp4',
  'How_To_Hack_Into_a_Computer.mp4'
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
  if(e.request.mode === 'navigate')
  {
       e.waitUntil(
      caches
      .open(cacheName)
        .then(cache =>
        {
          console.log("service worker: Caching Files in fetch");
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
  }
  console.log("service worker: fetching");
  /*e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );*/
        myRequest = new Request('/book_test/trumpswears.jpg');
      /*      caches.delete(myRequest).then(function() {
        console.log("GitRekt");
        
});*/
      fetch('The_Doll_Bloodborne_ver2.jpg')
        .then(function(response){
        console.log("swapped:start");
          caches.open(cacheName).then(function(cache) {
          cache.put(myRequest, response);
            console.log("swapped: end");
  }); 
      
      });
  e.respondWith(//function(){
    // Try the cache
    caches.match(e.request).then(function(response) {
      // Fall back to networkvar


      return response || fetch(e.request);
    //return caches.match('/book_test/trumpswears.jpg');
    })
  );
});
