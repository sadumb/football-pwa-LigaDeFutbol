const CACHE_NAME = 'football-PWA-v1.2';
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
	'src/script/sw-register.js',
    'src/script/event_listener.js',

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

//push notification

self.addEventListener('push', function(event) {
	let body;
	if (event.data) {
	  body = event.data.text();
	} else {
	  body = 'Push message no payload';
	}
	let options = {
	  body: body,
	  icon: '/icon.png',
	  vibrate: [100, 50, 100],
	  data: {
		dateOfArrival: Date.now(),
		primaryKey: 1
	  }
	};
	event.waitUntil(
	  self.registration.showNotification('Push Notification', options)
	);
});
