
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
	const isLowPerformance = window.innerWidth <= 720 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
		
		/*
		// Carousel optimization
		let currentIndex = 0;
		let itemsPerView = getItemsPerView();
		let originalItems = [];
		let totalOriginalItems = 0;
		let isTransitioning = false;
		let touchStartX = 0;
		let touchCurrentX = 0;
		let isDragging = false;

		const imageFiles = [
			{ src: 'Samsung_Ocean_1.png', alt: 'Workshop Jogos Digitais - Samsung Ocean' },
			{ src: 'Samsung_Ocean_2.png', alt: 'Introdução a Jogos Digitais - Samsung Ocean' },
			{ src: 'TDC_Trilha_DevTest.png', alt: 'Trilha DevTest TDC' },
			{ src: 'TDC_Trilha_Testes.png', alt: 'Trilha Testes - TDC' },
			{ src: 'UC-Cypress.jpg', alt: 'Testes End-To-End Cypress - Udemy' }
		];

		function createCarouselItems() {
			carousel.innerHTML = '';
			originalItems = [];
			imageFiles.forEach(file => {
				const item = document.createElement('div');
				item.classList.add('carousel-item');
				const img = document.createElement('img');
				img.loading = 'lazy';
				img.src = `certificados/${file.src}`;
				img.srcset = `certificados/${file.src.replace(/\.(png|jpg)$/, '_low.$1')} 480w, certificados/${file.src} 800w`;
				img.sizes = '(max-width: 720px) 480px, 800px';
				img.width = 800;
				img.height = 600;
				img.alt = file.alt;
				item.appendChild(img);
				carousel.appendChild(item);
				originalItems.push(item);
			});
			totalOriginalItems = originalItems.length;
		}

		function getItemsPerView() {
			if (window.innerWidth <= 720) return 1;
			if (window.innerWidth <= 1024) return 2;
			return 3;
		}

		function debounce(func, wait) {
			let timeout;
			return function executedFunction(...args) {
				const later = () => {
					clearTimeout(timeout);
					func(...args);
				};
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
			};
		}

		function throttle(func, limit) {
			let inThrottle;
			return function (...args) {
				if (!inThrottle) {
					func.apply(this, args);
					inThrottle = true;
					setTimeout(() => inThrottle = false, limit);
				}
			};
		}

		function setupInfiniteCarousel() {
			const clonesBefore = originalItems.map(item => item.cloneNode(true));
			const clonesAfter = originalItems.map(item => item.cloneNode(true));
			clonesBefore.reverse().forEach(clone => carousel.prepend(clone));
			clonesAfter.forEach(clone => carousel.appendChild(clone));
			currentIndex = totalOriginalItems;
			updateCarousel(true);
			attachImageClickEvents();
		}

		function updateCarousel(noTransition = false) {
			if (isTransitioning && !noTransition) return;
			isTransitioning = !noTransition;
			const itemWidth = 100 / itemsPerView;
			const offset = itemsPerView === 1 ? 0 : (100 / itemsPerView) * (itemsPerView - 1) / 2;
			if (noTransition) {
				carousel.style.transition = 'none';
			}
			carousel.style.transform = `translateX(calc(-${currentIndex * itemWidth}% + ${offset}%))`;
			if (noTransition) {
				requestAnimationFrame(() => {
					carousel.style.transition = 'transform 0.5s ease-in-out';
					isTransitioning = false;
				});
			} else {
				setTimeout(() => {
					isTransitioning = false;
				}, 500);
			}
			requestAnimationFrame(updateIndicators);
		}

		function updateIndicators() {
			const dots = indicatorsContainer.querySelectorAll('.dot');
			const activeIndex = ((currentIndex % totalOriginalItems) + totalOriginalItems) % totalOriginalItems;
			dots.forEach((dot, index) => {
				if (itemsPerView === 1) {
					dot.classList.toggle('active', index === activeIndex);
				} else {
					dot.classList.toggle('active', index === Math.floor(activeIndex / itemsPerView));
				}
			});
		}

		function createIndicators() {
			indicatorsContainer.innerHTML = '';
			const totalGroups = itemsPerView === 1 ? totalOriginalItems : Math.ceil(totalOriginalItems / itemsPerView);
			for (let i = 0; i < totalGroups; i++) {
				const dot = document.createElement('div');
				dot.classList.add('dot');
				if (i === 0) dot.classList.add('active');
				dot.addEventListener('click', () => {
					if (isTransitioning) return;
					currentIndex = totalOriginalItems + (i * itemsPerView);
					updateCarousel();
				});
				indicatorsContainer.appendChild(dot);
			}
		}

		prevButton.addEventListener('click', () => {
			if (isTransitioning) return;
			currentIndex--;
			updateCarousel();
			if (currentIndex <= 0) {
				setTimeout(() => {
					currentIndex = totalOriginalItems;
					updateCarousel(true);
				}, 500);
			}
		});

		nextButton.addEventListener('click', () => {
			if (isTransitioning) return;
			currentIndex++;
			updateCarousel();
			if (currentIndex >= totalOriginalItems * 2) {
				setTimeout(() => {
					currentIndex = totalOriginalItems;
					updateCarousel(true);
				}, 500);
			}
		});

		function attachImageClickEvents() {
			const allItems = document.querySelectorAll('.carousel-item');
			allItems.forEach(item => {
				const img = item.querySelector('img');
				img.addEventListener('click', () => {
					modalImage.src = img.src;
					modal.style.display = 'flex';
				});
			});
		}

		modalClose.addEventListener('click', () => {
			modal.style.display = 'none';
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				modal.style.display = 'none';
			}
		});

		// Touch events with throttling
		carousel.addEventListener('touchstart', (e) => {
			if (isTransitioning) return;
			touchStartX = e.touches[0].clientX;
			isDragging = true;
			carousel.style.transition = 'none';
			carouselContainer.classList.add('dragging');
		});

		carousel.addEventListener('touchmove', throttle((e) => {
			if (!isDragging || isTransitioning) return;
			touchCurrentX = e.touches[0].clientX;
			const deltaX = touchCurrentX - touchStartX;
			const itemWidth = 100 / itemsPerView;
			const offset = itemsPerView === 1 ? 0 : (100 / itemsPerView) * (itemsPerView - 1) / 2;
			const currentTranslate = -currentIndex * itemWidth + offset;
			carousel.style.transform = `translateX(${currentTranslate + (deltaX / carousel.offsetWidth) * 100}%)`;
			e.preventDefault();
		}, 16));

		carousel.addEventListener('touchend', () => {
			if (!isDragging || isTransitioning) return;
			isDragging = false;
			const deltaX = touchCurrentX - touchStartX;
			const threshold = carousel.offsetWidth * 0.3;
			carousel.style.transition = 'transform 0.5s ease-in-out';
			carouselContainer.classList.remove('dragging');

			if (Math.abs(deltaX) > threshold) {
				if (deltaX < 0) {
					currentIndex++;
					updateCarousel();
					if (currentIndex >= totalOriginalItems * 2) {
						setTimeout(() => {
							currentIndex = totalOriginalItems;
							updateCarousel(true);
						}, 500);
					}
				} else {
					currentIndex--;
					updateCarousel();
					if (currentIndex <= 0) {
						setTimeout(() => {
							currentIndex = totalOriginalItems;
							updateCarousel(true);
						}, 500);
					}
				}
			} else {
				updateCarousel();
			}
		});

		const handleResize = debounce(() => {
			const newItemsPerView = getItemsPerView();
			if (newItemsPerView !== itemsPerView) {
				itemsPerView = newItemsPerView;
				currentIndex = totalOriginalItems;
				createIndicators();
				updateCarousel(true);
			}
		}, 100);

		window.addEventListener('resize', handleResize);*/

		updateSectionState();
		window.addEventListener('reload', updateSectionState);
	});

