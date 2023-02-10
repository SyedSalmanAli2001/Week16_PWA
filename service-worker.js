var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/image1.jpeg',
    'images/icon-512.png'
    // 'images/cat-litter.jpg',
    // 'images/laser-pointer.jpg',
    // 'images/cat-house.jpg', 
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');  e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })  
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         // check if the cache has the file        
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: '
//             + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r         
//         })    
//         );
//     });

self.addEventListener('fetch', function (e) {
    e.respondWith(
        // check if the cache has the file        
        caches.match(e.request).then(function (r) {
            // download file if not in the cache
            return r || fetch(e.request).then(function(response){
                // add the new file to cache
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })    
    );
});