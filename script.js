document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');
    const fadeElements = document.querySelectorAll('.fade-in');

    // ===================================
    // 1. HEADER COM SOMBRA NO SCROLL
    // ===================================
    const handleScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica no carregamento da página

    // ===================================
    // 2. FUNCIONALIDADE DO MENU MOBILE
    // ===================================
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            // Impede o scroll da página quando o menu está aberto
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ===================================
    // 3. SCROLL-SPY (DESTAQUE DO MENU)
    // ===================================
    const optionsScrollSpy = {
        root: null,
        rootMargin: '-40% 0px -60% 0px', // Ativa no meio da tela
        threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => link.classList.remove('active'));
                const id = entry.target.id;
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, optionsScrollSpy);

    sections.forEach(section => {
        scrollObserver.observe(section);
    });

    // ===================================
    // 4. ANIMAÇÕES DE FADE-IN AO ROLAR
    // ===================================
    const optionsFadeIn = {
        threshold: 0.1 // Ativa com 10% visível
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, optionsFadeIn);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

});