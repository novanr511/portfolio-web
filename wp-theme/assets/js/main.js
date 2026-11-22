/**
 * Maison — front-end interactions.
 * Vanilla JS, no dependencies.
 */
(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---------------------------------------------------------------- Menu */

	var menuToggle = document.querySelector('.menu-toggle');
	var primaryMenu = document.getElementById('primary-menu');

	if (menuToggle && primaryMenu) {
		function setMenu(open) {
			menuToggle.setAttribute('aria-expanded', String(open));
			menuToggle.setAttribute(
				'aria-label',
				open ? 'Close menu' : 'Open menu'
			);
			primaryMenu.classList.toggle('is-open', open);
			document.body.style.overflow = open ? 'hidden' : '';
		}

		menuToggle.addEventListener('click', function () {
			setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
		});

		primaryMenu.addEventListener('click', function (event) {
			if (event.target && event.target.closest && event.target.closest('a')) {
				setMenu(false);
			}
		});

		document.addEventListener('keydown', function (event) {
			if (
				event.key === 'Escape' &&
				menuToggle.getAttribute('aria-expanded') === 'true'
			) {
				setMenu(false);
				menuToggle.focus();
			}
		});
	}

	/* -------------------------------------------------------------- Search */

	var searchToggle = document.querySelector('.search-toggle');
	var searchPanel = document.getElementById('header-search');

	if (searchToggle && searchPanel) {
		searchToggle.addEventListener('click', function () {
			var open = searchToggle.getAttribute('aria-expanded') !== 'true';
			searchToggle.setAttribute('aria-expanded', String(open));
			searchToggle.setAttribute(
				'aria-label',
				open ? 'Close search' : 'Open search'
			);
			searchPanel.hidden = !open;

			if (open) {
				var input = searchPanel.querySelector('input[type="search"]');
				if (input) {
					input.focus();
				}
			}
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && !searchPanel.hidden) {
				searchPanel.hidden = true;
				searchToggle.setAttribute('aria-expanded', 'false');
				searchToggle.focus();
			}
		});
	}

	/* ------------------------------------------------------------ Carousel */

	var track = document.querySelector('[data-collection-track]');

	if (track) {
		function scrollStep() {
			var card = track.querySelector('.collection-card');
			return card
				? card.getBoundingClientRect().width + 16
				: track.clientWidth * 0.8;
		}

		var buttons = document.querySelectorAll('[data-carousel]');
		Array.prototype.forEach.call(buttons, function (button) {
			button.addEventListener('click', function () {
				var direction =
					button.getAttribute('data-carousel') === 'next' ? 1 : -1;
				track.scrollBy({
					left: direction * scrollStep(),
					behavior: reduceMotion ? 'auto' : 'smooth'
				});
			});
		});
	}

	/* ---------------------------------------------------------- Newsletter */

	var newsletter = document.querySelector('[data-newsletter-form]');

	if (newsletter) {
		newsletter.addEventListener('submit', function (event) {
			event.preventDefault();
			var status = newsletter.querySelector('.newsletter__status');
			var email = newsletter.querySelector('input[type="email"]');

			if (status) {
				status.textContent =
					'Terima kasih! Ini demo — tidak ada email yang dikirim.';
			}
			if (email) {
				email.value = '';
			}
		});
	}

	/* ------------------------------------------------------- Scroll reveal */

	var revealItems = document.querySelectorAll('[data-reveal]');

	if (revealItems.length) {
		if (reduceMotion || !('IntersectionObserver' in window)) {
			Array.prototype.forEach.call(revealItems, function (item) {
				item.classList.add('is-visible');
			});
		} else {
			var revealObserver = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							entry.target.classList.add('is-visible');
							revealObserver.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
			);

			Array.prototype.forEach.call(revealItems, function (item) {
				var parent = item.parentElement;
				if (parent && !item.hasAttribute('data-reveal-delay')) {
					var siblings = parent.querySelectorAll(':scope > [data-reveal]');
					var position = Array.prototype.indexOf.call(siblings, item);
					if (position > 0) {
						item.style.setProperty(
							'--reveal-delay',
							Math.min(position * 80, 400) + 'ms'
						);
					}
				}
				revealObserver.observe(item);
			});
		}
	}

	/* -------------------------------------------- Progress / to-top / parallax */

	var progressBar = document.querySelector('[data-scroll-progress]');
	var backToTop = document.querySelector('[data-back-to-top]');
	var parallaxItems = document.querySelectorAll('[data-parallax]');
	var ticking = false;

	function updateOnScroll() {
		var doc = document.documentElement;
		var offset = window.pageYOffset || doc.scrollTop;
		var maximum = doc.scrollHeight - window.innerHeight;
		var ratio = maximum > 0 ? Math.min(1, Math.max(0, offset / maximum)) : 0;

		if (progressBar) {
			progressBar.style.transform = 'scaleX(' + ratio + ')';
		}

		if (backToTop) {
			backToTop.classList.toggle('is-visible', offset > 500);
		}

		if (!reduceMotion && parallaxItems.length) {
			Array.prototype.forEach.call(parallaxItems, function (item) {
				var rect = item.getBoundingClientRect();
				if (rect.bottom < 0 || rect.top > window.innerHeight) {
					return;
				}
				var distance = rect.top + rect.height / 2 - window.innerHeight / 2;
				var shift = (distance * -0.035).toFixed(1);
				item.style.transform =
					'scale(1.06) translate3d(0,' + shift + 'px,0)';
			});
		}

		ticking = false;
	}

	if (progressBar || backToTop || parallaxItems.length) {
		window.addEventListener(
			'scroll',
			function () {
				if (!ticking) {
					window.requestAnimationFrame(updateOnScroll);
					ticking = true;
				}
			},
			{ passive: true }
		);
		updateOnScroll();
	}

	if (backToTop) {
		backToTop.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: reduceMotion ? 'auto' : 'smooth'
			});
		});
	}
})();
