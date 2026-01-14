// Cache de seletores DOM
const body = document.body;
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const sectionsToggleMobile = document.getElementById('sections-toggle-mobile');
const metaThemeColor = document.querySelector('meta[name="theme-color"]');
const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const modal = document.getElementById('certificate-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');

// Função para verificar desempenho em dispositivos móveis
const isLowPerformance = window.innerWidth <= 460 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function toggleDarkMode() {
	const isDark = body.classList.toggle('dark-mode');
	const toggleText = themeToggle.querySelector('.toggle-text');
	if (isDark) {
		themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
		themeToggleMobile.querySelector('i').classList.replace('fa-moon', 'fa-sun');
		toggleText.textContent = 'Modo Claro';
		metaThemeColor.setAttribute("content", "#1a202c");
		if (!isLowPerformance) startAsteroidsAnimation();
	} else {
		themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
		themeToggleMobile.querySelector('i').classList.replace('fa-sun', 'fa-moon');
		toggleText.textContent = 'Modo Escuro';
		metaThemeColor.setAttribute("content", "#b7eaffad");
		if (!isLowPerformance) startLeavesAnimation();
	}
	localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleAllSections() {
	const sections = document.querySelectorAll('.section:not(#resumo):not(#certificates)');
	const sectionsToggleIcon = sectionsToggleMobile.querySelector('.sections-toggle-icon');
	const sectionsToggleText = sectionsToggleMobile.querySelector('.toggle-text');
	const allCollapsed = Array.from(sections).every(section => section.classList.contains('collapsed'));

	sections.forEach(section => {
		section.classList.toggle('collapsed', !allCollapsed);
	});

	if (allCollapsed) {
		sectionsToggleIcon.classList.replace('fa-plus', 'fa-minus');
		sectionsToggleText.textContent = 'Fechar Tudo';
		const formacaoSection = document.getElementById('formacao-academica');
		if (formacaoSection) {
			formacaoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	} else {
		sectionsToggleIcon.classList.replace('fa-minus', 'fa-plus');
		sectionsToggleText.textContent = 'Expandir Tudo';
	}
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
	body.classList.add('dark-mode');
	themeToggle.querySelector('.toggle-text').textContent = 'Modo Claro';
	themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
	themeToggleMobile.querySelector('i').classList.replace('fa-moon', 'fa-sun');
	metaThemeColor.setAttribute("content", "#1a202c");
	if (!isLowPerformance) startAsteroidsAnimation();
} else {
	if (!isLowPerformance) startLeavesAnimation();
}

themeToggle.addEventListener('click', toggleDarkMode);
themeToggleMobile.addEventListener('click', toggleDarkMode);
sectionsToggleMobile.addEventListener('click', toggleAllSections);

function startAsteroidsAnimation() {
	let asteroids = [];

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	function createAsteroid() {
		const size = Math.random() * 4 + 2;
		return {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
			size: size,
			sides: Math.floor(Math.random() * 6) + 4
		};
	}

	for (let i = 0; i < (isLowPerformance ? 30 : 60); i++) {
		asteroids.push(createAsteroid());
	}

	function animateAsteroids() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
		asteroids.forEach(a => {
			ctx.beginPath();
			for (let i = 0; i < a.sides; i++) {
				const angle = (i / a.sides) * Math.PI * 2;
				ctx.lineTo(
					a.x + Math.cos(angle) * a.size,
					a.y + Math.sin(angle) * a.size
				);
			}
			ctx.closePath();
			ctx.fill();

			a.x += a.vx;
			a.y += a.vy;

			if (a.x < -a.size) a.x += canvas.width + a.size * 2;
			if (a.x > canvas.width + a.size) a.x -= canvas.width + a.size * 2;
			if (a.y < -a.size) a.y += canvas.height + a.size * 2;
			if (a.y > canvas.height + a.size) a.y -= canvas.height + a.size * 2;
		});

		if (body.classList.contains('dark-mode') && !isLowPerformance) {
			requestAnimationFrame(animateAsteroids);
		}
	}

	if (!isLowPerformance) animateAsteroids();
}

function startLeavesAnimation() {
	let leaves = [];

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	function createLeaf() {
		const size = Math.random() * 4 + 2;
		return {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
			size: size,
			color: `rgba(0, 0, 0, ${Math.random() * 0.15 + 0.05})`
		};
	}

	for (let i = 0; i < (isLowPerformance ? 30 : 60); i++) {
		leaves.push(createLeaf());
	}

	function animateLeaves() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		leaves.forEach(l => {
			ctx.beginPath();
			ctx.arc(l.x, l.y, l.size, 0, Math.PI * 2);
			ctx.fillStyle = l.color;
			ctx.fill();

			l.x += l.vx;
			l.y += l.vy;

			if (l.x < -l.size) l.x = canvas.width + l.size;
			if (l.x > canvas.width + l.size) l.x = -l.size;
			if (l.y < -l.size) l.y = canvas.height + l.size;
			if (l.y > canvas.height + l.size) l.y = -l.size;
		});

		if (!body.classList.contains('dark-mode') && !isLowPerformance) {
			requestAnimationFrame(animateLeaves);
		}
	}

	if (!isLowPerformance) animateLeaves();
}

document.addEventListener('DOMContentLoaded', () => {
	const resumoSection = document.querySelector('.experience');
	const floatingContacts = document.querySelector('.floating-contacts');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				floatingContacts.classList.add('hidden');
			} else {
				floatingContacts.classList.remove('hidden');
			}
		});
	}, {
		root: null,
		threshold: 0.1
	});

	observer.observe(resumoSection);

	const sectionHeaders = document.querySelectorAll('.section h2');
	sectionHeaders.forEach(header => {
		const section = header.parentElement;
		if (section.id !== 'resumo' && section.id !== 'certificates') {
			header.addEventListener('click', () => {
				if (window.innerWidth <= 720) {
					section.classList.toggle('collapsed');
				}
			});
		}
	});

	function updateSectionState() {
		const sections = document.querySelectorAll('.section');
		sections.forEach(section => {
			if (window.innerWidth > 720) {
				section.classList.remove('collapsed');
			} else if (section.id !== 'resumo' && section.id !== 'certificates') {
				section.classList.add('collapsed');
			}
		});
	}

	const langBars = document.querySelectorAll('.lang-bar');
	langBars.forEach((bar, index) => {
		setTimeout(() => {
			bar.classList.add('animate');
		}, index * 800);
	});

	const floatingButtons = document.querySelectorAll('.floating-contacts li');
	floatingButtons.forEach(button => {
		button.addEventListener('click', () => {
			if (window.innerWidth <= 720) {
				button.classList.add('active');
				setTimeout(() => {
					button.classList.remove('active');
				}, 100);
			}
		});
	});

	/*carrossel*/

	const AUTOPLAY_DELAY = 3500;

	let currentIndex = 0;
	let itemsPerView = getItemsPerView();
	let originalItems = [];
	let totalOriginalItems = 0;
	let isTransitioning = false;
	let isDragging = false;
	let autoplayTimer = null;

	let touchStartX = 0;
	let touchCurrentX = 0;


	const imageFiles = [
		{ src: 'Samsung_Ocean_1.png', alt: 'Workshop Jogos Digitais - Samsung Ocean' },
		{ src: 'Samsung_Ocean_2.png', alt: 'Introdução a Jogos Digitais - Samsung Ocean' },
		{ src: 'TDC_Trilha_DevTest.png', alt: 'Trilha DevTest TDC' },
		{ src: 'TDC_Trilha_Testes.png', alt: 'Trilha Testes - TDC' },
		{ src: 'UC-Cypress.jpg', alt: 'Testes End-To-End Cypress - Udemy' }
	];


	const debounce = (fn, d) => {
		let t; return (...a) => (clearTimeout(t), t = setTimeout(() => fn(...a), d));
	};

	const throttle = (fn, l) => {
		let w = false;
		return (...a) => !w && (fn(...a), w = true, setTimeout(() => w = false, l));
	};

	function getItemsPerView() {
		if (innerWidth <= 720) return 1;
		if (innerWidth <= 1024) return 2;
		return 3;
	}


	function createItems() {
		carousel.innerHTML = '';
		originalItems = [];

		imageFiles.forEach(f => {
			const d = document.createElement('div');
			d.className = 'carousel-item';
			d.innerHTML = `<img loading="lazy" src="certificados/${f.src}" alt="${f.alt}">`;
			carousel.appendChild(d);
			originalItems.push(d);
		});

		totalOriginalItems = originalItems.length;
	}


	function setupInfinite() {
		const before = [...originalItems].reverse().map(n => n.cloneNode(true));
		const after = originalItems.map(n => n.cloneNode(true));

		before.forEach(n => carousel.prepend(n));
		after.forEach(n => carousel.appendChild(n));

		currentIndex = totalOriginalItems;
		updateCarousel(true);
		attachImageEvents();
	}

	function updateCarousel(skip = false) {
		isTransitioning = !skip;

		const w = 100 / itemsPerView;
		const o = itemsPerView === 1 ? 0 : (w * (itemsPerView - 1)) / 2;

		carousel.style.transition = skip ? 'none' : 'transform .5s ease';
		carousel.style.transform = `translateX(${(-currentIndex * w) + o}%)`;

		updateIndicators();

		if (skip) requestAnimationFrame(() => {
			carousel.style.transition = 'transform .5s ease';
			isTransitioning = false;
		});
	}

	function normalize() {
		if (currentIndex >= totalOriginalItems * 2) {
			currentIndex = totalOriginalItems;
			updateCarousel(true);
		}
		if (currentIndex < totalOriginalItems) {
			currentIndex = totalOriginalItems * 2 - itemsPerView;
			updateCarousel(true);
		}
		isTransitioning = false;
	}

	function go(step) {
		if (isTransitioning) return;
		currentIndex += step;
		updateCarousel();
		carousel.addEventListener('transitionend', normalize, { once: true });
	}


	function updateIndicators() {
		const dots = indicatorsContainer.children;
		const idx = ((currentIndex - totalOriginalItems) % totalOriginalItems + totalOriginalItems) % totalOriginalItems;

		[...dots].forEach((d, i) =>
			d.classList.toggle('active',
				itemsPerView === 1 ? i === idx : i === Math.floor(idx / itemsPerView)
			)
		);
	}

	function createIndicators() {
		indicatorsContainer.innerHTML = '';
		const groups = itemsPerView === 1 ? totalOriginalItems : Math.ceil(totalOriginalItems / itemsPerView);

		for (let i = 0; i < groups; i++) {
			const d = document.createElement('div');
			d.className = 'dot';
			d.onclick = () => !isTransitioning && (currentIndex = totalOriginalItems + i * itemsPerView, updateCarousel());
			indicatorsContainer.appendChild(d);
		}
	}


	function startAutoplay() {
		stopAutoplay();
		autoplayTimer = setInterval(() => go(1), AUTOPLAY_DELAY);
	}

	function stopAutoplay() {
		clearInterval(autoplayTimer);
	}


	prevButton.onclick = () => go(-1);
	nextButton.onclick = () => go(1);

	carousel.addEventListener('mouseenter', stopAutoplay);
	carousel.addEventListener('mouseleave', startAutoplay);

	carousel.addEventListener('touchstart', e => {
		stopAutoplay();
		if (isTransitioning) return;
		isDragging = true;
		touchStartX = e.touches[0].clientX;
		carousel.style.transition = 'none';
	});

	carousel.addEventListener('touchmove', throttle(e => {
		if (!isDragging || isTransitioning) return;
		touchCurrentX = e.touches[0].clientX;
		const dx = touchCurrentX - touchStartX;
		const w = 100 / itemsPerView;
		carousel.style.transform = `translateX(${(-currentIndex * w) + (dx / carousel.offsetWidth) * 100}%)`;
		e.preventDefault();
	}, 16));

	carousel.addEventListener('touchend', () => {
		if (!isDragging) return;
		isDragging = false;
		const dx = touchCurrentX - touchStartX;
		if (Math.abs(dx) > carousel.offsetWidth * 0.3) go(dx < 0 ? 1 : -1);
		else updateCarousel();
		startAutoplay();
	});


	function attachImageEvents() {
		document.querySelectorAll('.carousel-item img').forEach(img =>
			img.onclick = () => (modalImage.src = img.src, modal.style.display = 'flex')
		);
	}

	modal.onclick = e => e.target === modal && (modal.style.display = 'none');
	modalClose.onclick = () => modal.style.display = 'none';


	window.addEventListener('resize', debounce(() => {
		const v = getItemsPerView();
		if (v !== itemsPerView) {
			itemsPerView = v;
			currentIndex = totalOriginalItems;
			createIndicators();
			updateCarousel(true);
		}
	}, 100));


	createItems();
	setupInfinite();
	createIndicators();
	startAutoplay();


	window.addEventListener('resize', handleResize);

	createCarouselItems();
	setupInfiniteCarousel();
	createIndicators();
	updateCarousel();

	updateSectionState();
	window.addEventListener('reload', updateSectionState);
});
