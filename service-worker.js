const CACHE_NAME = 'football-PWA-v1';
var urlsToCache = [
	'/',
	'/index.html',
	'/src/css/materialize.min.css',
	'/src/scss/style.css',

	'/src/pages',
	'/src/pages/home.html',
	'/src/pages/match.html',
	'/src/pages/saved.html',
	'/src/pages/standing.html',

	'/src/script',
	'/src/script/api.js',
	'/src/script/materialize.min.js',
	'/src/script/nav.js',
	'src/script/db.js',
	'src/script/idb.js',

	'/manifest.json'
	
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener("fetch", function(event) {
	const BASE_URL = "https://api.football-data.org/v2";
	if (event.request.url.indexOf(BASE_URL) > -1) {
	  event.respondWith(
		caches.open(CACHE_NAME).then(function(cache) {
		  return fetch(event.request).then(function(response) {
			cache.put(event.request.url, response.clone());
			return response;
		  })
		})
	  );
	} else {
		event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then(function(response) {
				return response || fetch (event.request);
			})
		)
	}
});

