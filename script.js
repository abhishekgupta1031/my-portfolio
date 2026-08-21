/**
 * Abhishek Gupta - Portfolio Script
 * Designed for Performance, Accessibility, and Maintainability.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* =====================================================
       1. LOADER CONTROLLER
    ===================================================== */
    const initLoader = () => {
        const loader = document.getElementById("loader");
        if (loader) {
            window.addEventListener("load", () => {
                setTimeout(() => loader.classList.add("hide"), 400);
            });
            // Fallback timeout in case window.load fired earlier
            setTimeout(() => loader.classList.add("hide"), 1500);
        }
    };

    /* =====================================================
       2. THEME SWITCHER ENGINE
    ===================================================== */
    const initThemeToggle = () => {
        const themeBtn = document.getElementById("theme-toggle");
        const themeIcon = document.getElementById("theme-icon");
        const rootTag = document.documentElement;

        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

        const applyTheme = (theme) => {
            rootTag.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
            
            if (themeIcon) {
                themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
            }
        };

        applyTheme(currentTheme);

        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                const activeTheme = rootTag.getAttribute("data-theme");
                const newTheme = activeTheme === "dark" ? "light" : "dark";
                applyTheme(newTheme);
            });
        }
    };

    /* =====================================================
       3. NAVIGATION & ACCESSIBLE MOBILE MENU
    ===================================================== */
    const initNavigation = () => {
        const menuBtn = document.querySelector(".menu-btn");
        const navLinks = document.querySelector(".nav-links");

        if (menuBtn && navLinks) {
            const toggleMenu = (isOpen) => {
                const shouldOpen = isOpen !== undefined ? isOpen : !navLinks.classList.contains("open");
                navLinks.classList.toggle("open", shouldOpen);
                menuBtn.setAttribute("aria-expanded", shouldOpen);
                
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.className = shouldOpen ? "fas fa-times" : "fas fa-bars";
                }
            };

            menuBtn.addEventListener("click", () => toggleMenu());

            document.querySelectorAll(".nav-links a").forEach(link => {
                link.addEventListener("click", () => toggleMenu(false));
            });
        }
    };

    /* =====================================================
       4. TYPING EFFECT ENGINE
    ===================================================== */
    const initTypingEffect = () => {
        const typingElement = document.getElementById("typing");
        if (!typingElement) return;

        const words = ["Frontend Developer", "React Developer", "Web Designer", "JavaScript Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (!isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, 1800);
                    return;
                }
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
            setTimeout(type, isDeleting ? 50 : 100);
        };

        type();
    };

    /* =====================================================
       5. SCROLL ENGINE (PERFORMANCE OPTIMIZED)
    ===================================================== */
    const initScrollEffects = () => {
        const header = document.querySelector("header");
        const topBtn = document.getElementById("topBtn");
        const sections = document.querySelectorAll("section[id]");
        const navItems = document.querySelectorAll(".nav-links a");

        let ticking = false;

        const onScroll = () => {
            const scrollY = window.scrollY;

            if (header) {
                header.classList.toggle("scrolled", scrollY > 50);
            }

            if (topBtn) {
                topBtn.style.display = scrollY > 400 ? "flex" : "none";
            }

            let currentSectionId = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 160;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute("id");
                }
            });

            navItems.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });

            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(onScroll);
                ticking = true;
            }
        });

        if (topBtn) {
            topBtn.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    };

    /* =====================================================
       6. INTERSECTION OBSERVERS (REVEAL & SKILLS)
    ===================================================== */
    const initObservers = () => {
        const revealElements = document.querySelectorAll("section, .card, .project-card, .timeline-item");
        revealElements.forEach(el => el.classList.add("reveal"));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

        const skillSection = document.getElementById("skills");
        if (skillSection) {
            const skillObserver = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting) {
                    const skillMap = {
                        ".html": "95%",
                        ".css": "90%",
                        ".js": "85%",
                        ".react": "80%"
                    };

                    Object.entries(skillMap).forEach(([selector, width]) => {
                        const el = document.querySelector(selector);
                        if (el) el.style.width = width;
                    });

                    observer.unobserve(skillSection);
                }
            }, { threshold: 0.2 });

            skillObserver.observe(skillSection);
        }
    };

    /* =====================================================
       7. PARTICLES.JS INITIALIZATION
    ===================================================== */
    const initParticles = () => {
        if (typeof particlesJS !== "undefined" && document.getElementById("particles-js")) {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 45, density: { enable: true, value_area: 900 } },
                    color: { value: "#00d4ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.2, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 130, color: "#7c3aed", opacity: 0.15, width: 1 },
                    move: { enable: true, speed: 1, out_mode: "out" }
                },
                interactivity: {
                    events: {
                        onhover: { enable: true, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    };

    // Initialize all modules cleanly
    initLoader();
    initThemeToggle();
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initObservers();
    initParticles();
});