(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - 70,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 300)
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  const animateSkills = () => {
    let skilsContent = select('.skills-content');
    if (skilsContent) {
      let progressBars = select('.progress-bar', true);
      progressBars.forEach((el) => {
        el.style.width = '0%';
        setTimeout(() => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        }, 100);
      });
    }
  }

  // Trigger skills animation when section is visible
  let skillsSection = select('#skills');
  if (skillsSection) {
    let skillsAnimated = false;
    const checkSkills = () => {
      let windowHeight = window.innerHeight;
      let skillsTop = skillsSection.getBoundingClientRect().top;

      if (skillsTop < windowHeight * 0.75 && !skillsAnimated) {
        animateSkills();
        skillsAnimated = true;
      }
    }

    window.addEventListener('scroll', checkSkills);
    window.addEventListener('load', checkSkills);
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 80
    })
  });

  /**
   * Contact Form Handling
   */
  const contactForm = select('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = select('#name');
      const emailInput = select('#email');
      const subjectInput = select('#subject');
      const messageInput = select('#message');
      const loading = select('.loading');
      const sentMessage = select('.sent-message');
      const errorResponse = select('.error-response');

      sentMessage.style.display = 'none';
      errorResponse.style.display = 'none';

      const errorMessages = select('.error-message', true);
      errorMessages.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
      });

      let isValid = true;

      if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }

      if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Please enter a subject (at least 3 characters)');
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
      }

      if (!isValid) return;

      loading.style.display = 'block';

      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      };

      sendEmail(formData)
        .then(() => {
          loading.style.display = 'none';
          sentMessage.style.display = 'block';
          contactForm.reset();

          setTimeout(() => {
            sentMessage.style.display = 'none';
          }, 5000);
        })
        .catch((error) => {
          loading.style.display = 'none';
          errorResponse.style.display = 'block';
          errorResponse.textContent = 'Failed to send message. Please try again later.';

          setTimeout(() => {
            errorResponse.style.display = 'none';
          }, 5000);
        });
    });
  }

  function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  async function sendEmail(formData) {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  /**
   * Cursor Glow Effect
   */
  const cursorGlow = select('#cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });

    const animateCursor = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  /**
   * Floating Particles Generator
   */
  const particlesContainer = select('#particles');
  if (particlesContainer) {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.4 + 0.1;

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = left + '%';
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = delay + 's';
      particle.style.opacity = '0';

      // Vary particle colors
      const colors = [
        'rgba(167, 139, 250, 0.6)',
        'rgba(6, 182, 212, 0.5)',
        'rgba(236, 72, 153, 0.4)',
        'rgba(245, 158, 11, 0.3)'
      ];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];

      particlesContainer.appendChild(particle);
    };

    // Create initial particles
    for (let i = 0; i < 25; i++) {
      createParticle();
    }
  }

  /**
   * Stats Counter Animation
   */
  const animateCounters = () => {
    const counters = select('[data-count]', true);
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };
      updateCounter();
    });
  };

  // Trigger counter animation when About section is visible
  const aboutSection = select('#about');
  if (aboutSection) {
    let countersAnimated = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          countersAnimated = true;
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(aboutSection);
  }

  /**
   * Smooth Parallax on Scroll
   */
  const parallaxElements = select('[data-parallax]', true);
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  /**
   * Magnetic Hover Effect for buttons
   */
  const magneticButtons = select('.btn-primary, .btn-secondary, .submit-btn', true);
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /**
   * Tilt Effect on Cards
   */
  const tiltCards = select('.education-card, .service-box, .portfolio-wrap', true);
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * 8;
      const tiltY = (x - 0.5) * -8;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  /**
   * Smooth reveal sections
   */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    revealObserver.observe(section);
  });

  /**
   * Scroll-based Navbar transparency
   */
  const header = select('#header');
  if (header) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 11, 26, 0.95)';
      } else {
        header.style.background = 'rgba(15, 11, 26, 0.8)';
      }
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

})();
