let cacheData = 'appV1';
this.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheData).then(cache => {
			cache.addAll([
				'/static/js/bundle.js',
				'/index.html',
				'/manifest.json',
				'/',
				'/imgs/cards/1.jpg',
				'/imgs/cards/2.jpg',
				'/imgs/cards/3.jpg',
				'/imgs/cards/4.jpg',
				'/imgs/cards/5.jpg',
				'/imgs/cards/6.jpg',
				'/imgs/cards/7.jpg',
				'/imgs/cards/8.jpg',
				'/imgs/cards/9.jpg',
				'/imgs/cards/10.jpg',
				'/imgs/cards/11.jpg',
				'/imgs/cards/12.jpg',
				'/imgs/cards/13.jpg',
				'/imgs/cards/14.jpg',
				'/imgs/cards/15.jpg',
				'/imgs/cards/16.jpg',
				'/imgs/cards/17.jpg',
				'/imgs/cards/18.jpg',
				'/imgs/cards/19.jpg',
				'/imgs/cards/20.jpg',
				'/imgs/cards/21.jpg',
				'/imgs/cards/22.jpg',
				'/imgs/cards/23.jpg',
				'/imgs/cards/24.jpg',
				'/favicon.ico',
				'/icons/maskable_icon_x192.png',
				'/screenshots/select_event_2.png',
				'/screenshots/select_event.png',
				'/screenshots/select_card.png',
				'/screenshots/card_user_customize.png',
				'/screenshots/event_result.png',
			]);
			cache.delete('');
		}),
	);
});

this.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(res => {
			if (res) {
				return res;
			}
		}),
	);
});
