const CACHE_NAME = 'Liga-de-Futbol-v1.0';
var urlsToCache = [
	'/',
	'/index.html',
	'/nav.html',
	'/src/css/materialize.min.css',
	'/src/scss/style.css',	

	'/src/pages',
	'/src/pages/home.html',
	'/src/pages/match.html',
	'/src/pages/saved.html',
	'/src/pages/standing.html',

	'/push.js',
	'/src/script/api.js',
	'/src/script/db.js',
	'/src/script/event_listener.js',
	'/src/script/idb.js',
	'/src/script/main.js',
	'/src/script/materialize.min.js',
	'/src/script/nav.js',
	'/src/script/pwa-register.js',

	'src/assets/icons/icon192.png',
	'src/assets/icons/icon512.png',
	'src/assets/icons/maskable_icon_x72.png',
	'src/assets/icons/maskable_icon_x96.png',
	'src/assets/icons/maskable_icon_x144.png',
	'src/assets/logo/favicon.ico',

	'/src/assets/img/stadium-hd.jpg',
	'/src/assets/logo/logo.png',

	'/package-lock.json',
	'/manifest.json',

	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://use.fontawesome.com/releases/v5.15.1/css/all.css'
	
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
