// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 500);
    }
});

// Header Scroll Effect
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navbar transparency and scrolling effects
document.addEventListener('DOMContentLoaded', function() {
    // Instagram Feed
    const instagramFeed = document.getElementById('instagramFeed');
    if (instagramFeed) {
        // Replace these with your Instagram Basic Display API credentials
        const accessToken = 'YOUR_ACCESS_TOKEN';
        const userId = 'YOUR_USER_ID';

        async function fetchInstagramPosts() {
            try {
                const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}`);
                const data = await response.json();
                
                if (data.data && data.data.length > 0) {
                    // Clear loading state
                    instagramFeed.innerHTML = '';
                    
                    // Display up to 5 most recent posts
                    const posts = data.data.slice(0, 5);
                    
                    posts.forEach(post => {
                        if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
                            const postElement = document.createElement('div');
                            postElement.className = 'instagram-item';
                            
                            postElement.innerHTML = `
                                <img src="${post.media_url}" alt="${post.caption || 'Instagram post'}" loading="lazy">
                                <div class="overlay">
                                    <i class="fab fa-instagram"></i>
                                </div>
                            `;
                            
                            // Add click event to open the post on Instagram
                            postElement.addEventListener('click', () => {
                                window.open(post.permalink, '_blank');
                            });
                            
                            instagramFeed.appendChild(postElement);
                        }
                    });
                } else {
                    instagramFeed.innerHTML = '<div class="instagram-loading"><p>No Instagram posts found.</p></div>';
                }
            } catch (error) {
                console.error('Error fetching Instagram posts:', error);
                instagramFeed.innerHTML = '<div class="instagram-loading"><p>Error loading Instagram posts. Please try again later.</p></div>';
            }
        }

        fetchInstagramPosts();
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check
    handleScroll();

    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize slideshow
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            const content = slide.querySelector('.hero-content');
            if (content) {
                content.style.opacity = '0';
            }
        });

        // Add active class to current slide
        slides[index].classList.add('active');
        
        // Animate content
        const content = slides[index].querySelector('.hero-content');
        if (content) {
            setTimeout(() => {
                content.style.opacity = '1';
            }, 100);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });

    nextButton.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    // Initialize slideshow
    showSlide(currentSlide);
    startSlideshow();

    // Pause slideshow when hovering over navigation
    const slideNav = document.querySelector('.slide-nav');
    slideNav.addEventListener('mouseenter', stopSlideshow);
    slideNav.addEventListener('mouseleave', startSlideshow);

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            const content = slide.querySelector('.hero-content');
            if (content) {
                content.style.opacity = '0';
            }
        });

        // Add active class to current slide
        slides[index].classList.add('active');
        
        // Animate content
        const content = slides[index].querySelector('.hero-content');
        if (content) {
            setTimeout(() => {
                content.style.opacity = '1';
            }, 100);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });

    nextButton.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    // Initialize slideshow
    showSlide(currentSlide);
    startSlideshow();

    // Pause slideshow when hovering over navigation
    const slideNav = document.querySelector('.slide-nav');
    slideNav.addEventListener('mouseenter', stopSlideshow);
    slideNav.addEventListener('mouseleave', startSlideshow);

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    }

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
});

// Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentImageIndex = 0;

    // Filter Gallery Items
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 0);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Open Lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            const imgSrc = item.querySelector('img').getAttribute('src');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close Lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navigate Lightbox
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxImage();
    });

    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateLightboxImage();
    });

    // Update Lightbox Image
    function updateLightboxImage() {
        const item = galleryItems[currentImageIndex];
        const imgSrc = item.querySelector('img').getAttribute('src');
        const imgAlt = item.querySelector('img').getAttribute('alt');
        lightboxImg.setAttribute('src', imgSrc);
        lightboxImg.setAttribute('alt', imgAlt);
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            updateLightboxImage();
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(element);
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => img.classList.add('loaded'));
    }
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

if (testimonials.length > 1) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Initialize testimonial display
if (testimonials.length > 0) {
    showTestimonial(0);
}

// Add hover effect to package cards
const packageCards = document.querySelectorAll('.package-card');
packageCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add active class to current navigation item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', setActiveNavItem);

// Optimize gallery images
function optimizeGalleryImages() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        // Add loading="lazy" attribute
        img.setAttribute('loading', 'lazy');
        
        // Store original src in data-src
        if (!img.dataset.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f5f5f5"/%3E%3C/svg%3E';
        }
    });
}

// Call gallery optimization when DOM is loaded
document.addEventListener('DOMContentLoaded', optimizeGalleryImages);

// Review System Functionality
document.addEventListener('DOMContentLoaded', () => {
    const reviewForms = document.querySelectorAll('.review-form');
    
    // Function to update review count everywhere
    function updateReviewCount(safariTitle, increment = true) {
        // Update in all safari cards
        document.querySelectorAll('.safari-card').forEach(card => {
            if (card.querySelector('h2').textContent === safariTitle) {
                const countElement = card.querySelector('.review-count');
                const countNumber = countElement.querySelector('.count');
                const currentCount = parseInt(countNumber.textContent);
                const newCount = increment ? currentCount + 1 : currentCount - 1;
                
                countNumber.textContent = newCount;
                
                // Show/hide the review count based on whether there are any reviews
                countElement.style.display = newCount > 0 ? 'flex' : 'none';
            }
        });

        // Update in modal if it's open
        const modal = document.querySelector('.safari-modal');
        if (modal.classList.contains('active')) {
            const modalTitle = modal.querySelector('.modal-info h2').textContent;
            if (modalTitle === safariTitle) {
                const modalCount = modal.querySelector('.review-count');
                if (modalCount) {
                    const countNumber = modalCount.querySelector('.count');
                    const currentCount = parseInt(countNumber.textContent);
                    const newCount = increment ? currentCount + 1 : currentCount - 1;
                    
                    countNumber.textContent = newCount;
                    modalCount.style.display = newCount > 0 ? 'flex' : 'none';
                }
            }
        }
    }

    // Handle review submission
    function handleReviewSubmit(form, safariTitle) {
        const textarea = form.querySelector('textarea');
        const ratingInput = form.querySelector('input[name="rating"]:checked');
        const comment = textarea.value.trim();
        
        if (!ratingInput) {
            alert('Please select a rating');
            return;
        }
        
        if (!comment) {
            alert('Please write a review');
            return;
        }

        const rating = parseInt(ratingInput.value);
        const review = {
            author: 'Anonymous', // You can modify this to include user names if you have user authentication
            rating: rating,
            comment: comment,
            date: new Date().toLocaleDateString()
        };

        // Add review to the list
        const reviewsList = form.closest('.reviews-section').querySelector('.reviews-list');
        const reviewElement = createReviewElement(review);
        reviewsList.insertBefore(reviewElement, reviewsList.firstChild);

        // Clear the form
        textarea.value = '';
        ratingInput.checked = false;
        
        // Update review count
        updateReviewCount(safariTitle);
    }

    // Create review element
    function createReviewElement(review) {
        const div = document.createElement('div');
        div.className = 'review-item';
        
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        div.innerHTML = `
            <div class="review-header">
                <div class="review-author">${review.author}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${stars}</div>
            <div class="review-content">${review.comment}</div>
        `;
        
        return div;
    }

    reviewForms.forEach(form => {
        const stars = form.querySelectorAll('.star');
        const textarea = form.querySelector('textarea');
        let selectedRating = 0;
        const safariCard = form.closest('.safari-card');
        const safariTitle = safariCard.querySelector('h2').textContent;

        // Star rating functionality
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                selectedRating = rating;
                
                // Update star colors
                stars.forEach(s => {
                    const r = parseInt(s.getAttribute('data-rating'));
                    s.classList.toggle('active', r <= rating);
                });
            });

            // Hover effects
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                stars.forEach(s => {
                    const r = parseInt(s.getAttribute('data-rating'));
                    s.style.color = r <= rating ? '#ffd700' : '#ddd';
                });
            });

            star.addEventListener('mouseleave', () => {
                stars.forEach(s => {
                    const r = parseInt(s.getAttribute('data-rating'));
                    s.style.color = r <= selectedRating ? '#ffd700' : '#ddd';
                });
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            handleReviewSubmit(form, safariTitle);
        });
    });
});

// Safari Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.safari-modal');
    const modalContent = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    const detailBtns = document.querySelectorAll('.details-btn');

    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const safariCard = btn.closest('.safari-card');
            const safariData = {
                title: safariCard.querySelector('h2').textContent,
                image: safariCard.querySelector('img').src,
                price: safariCard.querySelector('.safari-price h3').textContent,
                duration: safariCard.querySelector('.safari-highlights span:first-child').textContent,
                groupSize: safariCard.querySelector('.safari-highlights span:nth-child(2)').textContent,
                season: safariCard.querySelector('.safari-highlights span:last-child').textContent,
                description: safariCard.querySelector('p').textContent,
                features: Array.from(safariCard.querySelectorAll('.feature')).map(feature => ({
                    icon: feature.querySelector('i').className,
                    text: feature.querySelector('span').textContent
                }))
            };

            // Populate modal content
            modalContent.innerHTML = `
                <div class="modal-safari">
                    <div class="modal-image">
                        <img src="${safariData.image}" alt="${safariData.title}">
                    </div>
                    <div class="modal-info">
                        <h2>${safariData.title}</h2>
                        <div class="modal-highlights">
                            <span>${safariData.duration}</span>
                            <span>${safariData.groupSize}</span>
                            <span>${safariData.season}</span>
                        </div>
                        <div class="modal-price">
                            <span>From</span>
                            <h3>${safariData.price}</h3>
                            <span>per person</span>
                        </div>
                        <p>${safariData.description}</p>
                        <div class="modal-features">
                            ${safariData.features.map(feature => `
                                <div class="feature">
                                    <i class="${feature.icon}"></i>
                                    <span>${feature.text}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="modal-actions">
                            <a href="contact.html" class="btn btn-primary">Book Now</a>
                        </div>
                        <div class="modal-reviews">
                            <h3>Customer Reviews</h3>
                            <div class="reviews-list">
                                <!-- Reviews will be dynamically loaded here -->
                            </div>
                            <div class="review-form">
                                <h4>Leave a Review</h4>
                                <div class="star-rating">
                                    <input type="radio" id="modal-star5" name="modal-rating" value="5">
                                    <label for="modal-star5" title="5 stars">★</label>
                                    <input type="radio" id="modal-star4" name="modal-rating" value="4">
                                    <label for="modal-star4" title="4 stars">★</label>
                                    <input type="radio" id="modal-star3" name="modal-rating" value="3">
                                    <label for="modal-star3" title="3 stars">★</label>
                                    <input type="radio" id="modal-star2" name="modal-rating" value="2">
                                    <label for="modal-star2" title="2 stars">★</label>
                                    <input type="radio" id="modal-star1" name="modal-rating" value="1">
                                    <label for="modal-star1" title="1 star">★</label>
                                </div>
                                <textarea placeholder="Write your review here..."></textarea>
                                <button class="btn">Submit Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Handle modal review form submission
    const modalReviewForm = document.querySelector('.modal-reviews .review-form');
    if (modalReviewForm) {
        modalReviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const safariTitle = document.querySelector('.modal-info h2').textContent;
            handleReviewSubmit(this, safariTitle);
        });
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}); 