// Global Variables
let currentTheme = 'light';
let isAudioPlaying = false;
let isLoading = true;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeSwitcher = document.querySelector('.theme-switcher');
const backToTop = document.getElementById('backToTop');
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalYear = document.getElementById('modal-year');
const modalMedium = document.getElementById('modal-medium');
const modalClose = document.querySelector('.modal-close');
const audioToggle = document.querySelector('.audio-toggle');
const backgroundAudio = document.getElementById('background-audio');

// Gallery Data
const galleryData = [
    {
        id: 1,
        title: "Self-Portrait with Thorn Necklace",
        description: "One of Frida's most famous self-portraits, symbolizing pain and suffering through Christian iconography.",
        year: "1940",
        medium: "Oil on canvas",
        category: "self-portraits",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
    },
    {
        id: 2,
        title: "The Two Fridas",
        description: "A double self-portrait representing the duality of her identity and her broken heart.",
        year: "1939",
        medium: "Oil on canvas",
        category: "self-portraits",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500"
    },
    {
        id: 3,
        title: "Still Life with Parrot",
        description: "Vibrant still life featuring tropical fruits and a parrot, celebrating Mexican culture.",
        year: "1951",
        medium: "Oil on canvas",
        category: "still-life",
        image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500"
    },
    {
        id: 4,
        title: "My Grandparents and I",
        description: "A portrait exploring her mixed heritage and family history in Mexico.",
        year: "1936",
        medium: "Oil and tempera on metal",
        category: "portraits",
        image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=500"
    },
    {
        id: 5,
        title: "Viva la Vida",
        description: "Her final painting, featuring watermelons with the inscription 'Long Live Life'.",
        year: "1954",
        medium: "Oil on masonite",
        category: "still-life",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500"
    },
    {
        id: 6,
        title: "The Frame",
        description: "The first work by a 20th-century Mexican artist acquired by the Louvre.",
        year: "1938",
        medium: "Oil on aluminum and glass",
        category: "self-portraits",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCnuvzTjkT_vnJBP7gGVhHiB7IFGV54fudfmNKVREqR10gHjE53B4_W3UVIyXRJytdWvymynS2-NwRGJtM2aBK0LdhGu5Qr9N245NFDCke2w"
    },
    {
        id: 7,
        title: "Girl with Death Mask",
        description: "A haunting portrait incorporating Day of the Dead imagery and Mexican traditions.",
        year: "1938",
        medium: "Oil on metal",
        category: "portraits",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAOFYD023mOvOQZbEfmpyuLvrSG2NnIq_97A&s"
    },
    {
        id: 8,
        title: "Coyoacán Landscape",
        description: "A rare landscape painting of her beloved hometown Coyoacán.",
        year: "1949",
        medium: "Oil on canvas",
        category: "landscapes",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
        }, 500);
    }, 2000);
    
    // Initialize all components
    initializeNavigation();
    initializeCustomCursor();
    initializeScrollEffects();
    initializeGallery();
    initializeAnimations();
    initializeAudio();
    initializeTheme();
    
    // Start background animations
    animateStats();
    animateSkillBars();
    
    // Initialize interactive elements
    initializeParallax();
    initializeTextEffects();
    initializeMasonry();
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Add animation to menu items
        const navItems = document.querySelectorAll('.nav-menu li');
        navItems.forEach((item, index) => {
            if (navMenu.classList.contains('active')) {
                item.style.animation = `navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            } else {
                item.style.animation = '';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Custom Cursor
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor interactions
    document.querySelectorAll('a, button, .gallery-item, .timeline-item, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Parallax scrolling for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImage = document.querySelector('.hero-image');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Gallery
function initializeGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!galleryGrid) return;
    
    // Render gallery items
    function renderGallery(items = galleryData) {
        galleryGrid.innerHTML = items.map(item => `
            <div class="gallery-item animate-on-scroll" data-category="${item.category}" onclick="openModal(${item.id})">
                <div class="gallery-item-inner">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.year} • ${item.medium}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Re-initialize animations for new elements
        observeElements();
    }
    
    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            const filteredItems = filter === 'all' 
                ? galleryData 
                : galleryData.filter(item => item.category === filter);
            
            // Animate out current items
            const currentItems = document.querySelectorAll('.gallery-item');
            currentItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                }, index * 50);
            });
            
            // Render new items after animation
            setTimeout(() => {
                renderGallery(filteredItems);
                // Initialize masonry after rendering
                setTimeout(() => {
                    initializeMasonry();
                }, 200);
            }, 500);
        });
    });
    
    // Initial render
    renderGallery();
    
    // Modal functionality
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        modalClose.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // Make gallery global
    window.openModal = openModal;
    window.closeModal = closeModal;
}

function openModal(id) {
    const item = galleryData.find(item => item.id === id);
    if (item && modal) {
        modalImage.src = item.image;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        modalYear.textContent = item.year;
        modalMedium.textContent = item.medium;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('active');
        }, 10);
    }
}

function closeModal() {
    if (modal) {
        modal.querySelector('.modal-content').classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    observeElements();
    
    // Add typing animation to elements with class 'typing-animation'
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const timer = setInterval(() => {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(timer);
                        }
                    }, 50);
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(element);
    });
}

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Stats Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length === 0) return;
    
    const animateCount = (element, target) => {
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };
    
    // Animate when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCount(stat, target);
                });
                statsObserver.disconnect();
            }
        });
    });
    
    const aboutSection = document.querySelector('.about-stats');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
}

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');

    if (skillBars.length === 0) return;

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.querySelector('.skill-progress');
                const level = bar.getAttribute('data-level') || '0';

                if (progress) {
                    progress.style.width = level + '%';
                }

                // Optional: Unobserve after animating
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.3 // Adjust as needed
    });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
}

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.warn(`Element with ID '${sectionId}' not found.`);
    }
  }

// Audio Player
function initializeAudio() {
    if (!backgroundAudio || !audioToggle) return;
    
    audioToggle.addEventListener('click', () => {
        if (isAudioPlaying) {
            backgroundAudio.pause();
            audioToggle.classList.remove('playing');
            audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            backgroundAudio.play();
            audioToggle.classList.add('playing');
            audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        
        isAudioPlaying = !isAudioPlaying;
    });
}

function initializeTheme() {
  if (!themeSwitcher) return;
  
  // Check for saved theme preference or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  currentTheme = savedTheme;
  
  // Apply theme immediately on page load
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButton();
  
  // Theme toggle functionality
  themeSwitcher.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeButton();
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });
}

function updateThemeButton() {
  if (!themeSwitcher) return;
  
  if (currentTheme === 'dark') {
    themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    themeSwitcher.setAttribute('title', 'Switch to Light Mode');
    themeSwitcher.classList.add('dark-mode');
  } else {
    themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    themeSwitcher.setAttribute('title', 'Switch to Dark Mode');
    themeSwitcher.classList.remove('dark-mode');
  }
}

// Parallax Effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
}

// Text Effects
function initializeTextEffects() {
    // Highlight text on scroll
    const highlightElements = document.querySelectorAll('.highlight-on-scroll');
    
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('highlighted');
                }, 200);
            }
        });
    });
    
    highlightElements.forEach(el => {
        highlightObserver.observe(el);
    });
    
    // Split text animation
    document.querySelectorAll('.split-text').forEach(text => {
        const content = text.textContent;
        const letters = content.split('');
        
        text.textContent = '';
        
        letters.forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.classList.add('letter');
            text.appendChild(span);
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const letters = entry.target.querySelectorAll('.letter');
                    letters.forEach((letter, index) => {
                        setTimeout(() => {
                            letter.classList.add('animated');
                        }, 50 * index);
                    });
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(text);
    });
}

  let currentQuoteIndex = 0;

  function changeQuote(direction) {
    const slides = document.querySelectorAll('.quote-slide');
    const totalSlides = slides.length;

    // Remove active class from current slide
    slides[currentQuoteIndex].classList.remove('active');

    // Calculate new index
    currentQuoteIndex = (currentQuoteIndex + direction + totalSlides) % totalSlides;

    // Add active class to new slide
    slides[currentQuoteIndex].classList.add('active');

    updateIndicators();
  }

  function createIndicators() {
    const slides = document.querySelectorAll('.quote-slide');
    const indicatorContainer = document.getElementById('quote-indicators');

    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('quote-indicator');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToQuote(index));
      indicatorContainer.appendChild(dot);
    });
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('.quote-indicator');
    indicators.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentQuoteIndex);
    });
  }

  function goToQuote(index) {
    const slides = document.querySelectorAll('.quote-slide');
    if (index >= 0 && index < slides.length) {
      slides[currentQuoteIndex].classList.remove('active');
      currentQuoteIndex = index;
      slides[currentQuoteIndex].classList.add('active');
      updateIndicators();
    }
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    createIndicators();
  });

// Masonry Layout
function initializeMasonry() {
  const gallery = document.getElementById('gallery-grid');
  if (!gallery) return;

  const items = gallery.querySelectorAll('.gallery-item');
  
  // Remove any inline styles that might cause overlapping
  items.forEach(item => {
    item.style.marginTop = '';
    item.style.position = '';
    item.style.top = '';
    item.style.left = '';
  });
  
  // Make items visible with smooth animation
  setTimeout(() => {
    items.forEach((item, index) => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('gallery-item-animate');
    });
  }, 100);
}

// Timeline Animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                form.innerHTML = '<div class="success-message animate-on-scroll animated"><i class="fas fa-check-circle"></i><h3>Thank you!</h3><p>Your message has been received.</p></div>';
            }, 1500);
        });
    }
    
    // Add form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (field.value === '') {
                field.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial state (for autofill)
        if (field.value !== '') {
            field.parentElement.classList.add('focused');
        }
    });
});

// Add event listeners for window resize
window.addEventListener('resize', () => {
    initializeMasonry();
});

// Call additional initializers
document.addEventListener('DOMContentLoaded', () => {
    initializeTimeline();
});
