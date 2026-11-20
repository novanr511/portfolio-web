/**
 * Novan Base — front-end interactions.
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
})();
