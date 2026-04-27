/**
 * Yarã - Menu Mobile (hamburger + drawer)
 * Garante que a navbar vire uma COLUNA de verdade no celular.
 */
(function () {
    'use strict';

    function setupMobileNav() {
        const nav = document.querySelector('.nav-modern');
        if (!nav) return;

        // Se o toggle ainda não existir, cria um
        let toggle = nav.querySelector('.nav-toggle');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.className = 'nav-toggle';
            toggle.type = 'button';
            toggle.setAttribute('aria-label', 'Abrir menu de navegação');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', 'yara-nav-drawer');
            toggle.innerHTML = '<span class="bars"><span></span></span>';
            nav.appendChild(toggle);
        }

        // Cria overlay único
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        const navLinks = nav.querySelector('.nav-links');
        const authBtns = nav.querySelector('.auth-btns');
        if (navLinks) navLinks.id = 'yara-nav-drawer';

        const closeMenu = () => {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu de navegação');
            if (navLinks) navLinks.classList.remove('open');
            if (authBtns) authBtns.classList.remove('open');
            overlay.classList.remove('open');
            document.body.classList.remove('nav-open');
        };

        const openMenu = () => {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fechar menu de navegação');
            if (navLinks) navLinks.classList.add('open');
            if (authBtns) authBtns.classList.add('open');
            overlay.classList.add('open');
            document.body.classList.add('nav-open');
        };

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            expanded ? closeMenu() : openMenu();
        });

        overlay.addEventListener('click', closeMenu);

        // Fechar ao clicar num link
        if (navLinks) {
            navLinks.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', closeMenu);
            });
        }

        // ESC fecha
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // Se redimensionar para desktop, garante menu fechado
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 900) closeMenu();
            }, 100);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMobileNav);
    } else {
        setupMobileNav();
    }
})();
