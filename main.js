// Slideshow functionality
function initSlideshow(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;
    const slides = slideshow.getElementsByClassName('slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    slides[0].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const header = document.querySelector('header');

    if (mobileMenuButton && mobileMenu) {
        const overlay = document.getElementById('mobileOverlay');
        const panel = document.getElementById('mobileMenuPanel');
        const icon = document.getElementById('mobileMenuIcon');

        function openMenu() {
            mobileMenu.classList.remove('hidden');
            mobileMenu.setAttribute('aria-hidden', 'false');
            overlay.classList.add('open');
            panel.classList.add('open');
            mobileMenuButton.setAttribute('aria-expanded', 'true');

            if (header) {
                const h = header.offsetHeight;
                panel.style.top = h + 'px';
                mobileMenu.style.setProperty('--header-height', h + 'px');
            }

            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                mobileMenuButton.setAttribute('aria-label', 'Fechar menu');
            }

            const firstLink = panel.querySelector('a');
            if (firstLink) firstLink.focus();
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            panel.classList.remove('open');
            overlay.classList.remove('open');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');

            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                mobileMenuButton.setAttribute('aria-label', 'Abrir menu');
            }

            document.body.style.overflow = '';

            setTimeout(() => {
                if (!panel.classList.contains('open')) {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);

            mobileMenuButton.focus();
        }

        mobileMenuButton.addEventListener('click', () => {
            const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            expanded ? closeMenu() : openMenu();
        });

        if (overlay) overlay.addEventListener('click', closeMenu);
        panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
            }
        });
    }
}

// Smooth scroll functionality
function initSmoothScroll() {
    const header = document.querySelector('header');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuButton = document.getElementById('mobileMenuButton');

            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
                return;
            }

            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const top = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
                    window.scrollTo({ top, behavior: 'smooth' });

                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
}

// Atualiza automaticamente o ano no rodapé
function updateFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow('slideshow1');
    initSlideshow('slideshow2');
    initMobileMenu();
    initSmoothScroll();
    updateFooterYear();
});

