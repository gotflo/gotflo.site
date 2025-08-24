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
        preloader.remove()
      }, 100)
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
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Contact Form Handling
   */
  const contactForm = select('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const nameInput = select('#name');
      const emailInput = select('#email');
      const subjectInput = select('#subject');
      const messageInput = select('#message');
      const loading = select('.loading');
      const sentMessage = select('.sent-message');
      const errorResponse = select('.error-response');
      
      // Reset messages
      sentMessage.style.display = 'none';
      errorResponse.style.display = 'none';
      
      // Clear previous errors
      const errorMessages = select('.error-message', true);
      errorMessages.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
      });
      
      // Validate form
      let isValid = true;
      
      // Validate name
      if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate subject
      if (subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Please enter a subject (at least 3 characters)');
        isValid = false;
      }
      
      // Validate message
      if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Show loading
      loading.style.display = 'block';
      
      // Prepare form data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      };
      
      // Send form using EmailJS or custom backend
      // For now, we'll simulate a successful submission
      sendEmail(formData)
        .then(() => {
          loading.style.display = 'none';
          sentMessage.style.display = 'block';
          contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            sentMessage.style.display = 'none';
          }, 5000);
        })
        .catch((error) => {
          loading.style.display = 'none';
          errorResponse.style.display = 'block';
          errorResponse.textContent = 'Failed to send message. Please try again later.';
          
          // Hide error message after 5 seconds
          setTimeout(() => {
            errorResponse.style.display = 'none';
          }, 5000);
        });
    });
  }
  
  /**
   * Show error message for input
   */
  function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }
  
  /**
   * Send email function
   * Replace this with your actual email service (EmailJS, custom API, etc.)
   */
  async function sendEmail(formData) {
    // Option 1: Using EmailJS (recommended)
    // First, sign up at https://www.emailjs.com/ and get your credentials
    // Uncomment and configure the following:
    /*
    emailjs.init("YOUR_PUBLIC_KEY");
    
    return emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "komlagotlieb@gmail.com"
    });
    */
    
    // Option 2: Using a custom backend API
    // Uncomment and configure the following:
    /*
    return fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
    */
    
    // For demonstration, simulate a successful send after 2 seconds
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }
  
  /**
   * Smooth scroll for all anchor links
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
  
  /**
   * Add subtle parallax effect to hero section
   */
  const hero = select('#hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = hero.querySelector('::before');
      const speed = 0.5;
      
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
      }
    });
  }
  
  /**
   * Animate elements on scroll
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

})();