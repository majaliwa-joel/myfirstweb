class TestimonialManager {
    constructor() {
        this.testimonials = [];
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.rotationSpeed = 5000; // 5 seconds between rotations
    }

    async loadTestimonials() {
        try {
            const response = await fetch('/data/testimonials.json');
            const data = await response.json();
            this.testimonials = data.testimonials;
            this.initializeTestimonials();
        } catch (error) {
            console.error('Error loading testimonials:', error);
        }
    }

    initializeTestimonials() {
        const testimonialContainer = document.querySelector('.testimonial-container');
        if (!testimonialContainer) return;

        // Create testimonial elements
        this.testimonials.forEach((testimonial, index) => {
            const testimonialElement = this.createTestimonialElement(testimonial, index);
            testimonialContainer.appendChild(testimonialElement);
        });

        // Start auto-rotation
        this.startAutoRotation();

        // Add navigation controls
        this.addNavigationControls();
    }

    createTestimonialElement(testimonial, index) {
        const div = document.createElement('div');
        div.className = `testimonial-item ${index === 0 ? 'active' : ''}`;
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', `${index * 100}`);

        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        
        div.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <div class="testimonial-text">
                    <div class="rating">${stars}</div>
                    <p>${testimonial.text}</p>
                    <div class="testimonial-author">
                        <h4>${testimonial.name}</h4>
                        <span>${testimonial.role}</span>
                    </div>
                </div>
            </div>
        `;

        return div;
    }

    addNavigationControls() {
        const container = document.querySelector('.testimonials');
        if (!container) return;

        const controls = document.createElement('div');
        controls.className = 'testimonial-controls';
        controls.innerHTML = `
            <button class="prev-btn" aria-label="Previous testimonial">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="next-btn" aria-label="Next testimonial">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        container.appendChild(controls);

        // Add event listeners
        const prevBtn = controls.querySelector('.prev-btn');
        const nextBtn = controls.querySelector('.next-btn');

        prevBtn.addEventListener('click', () => this.showPreviousTestimonial());
        nextBtn.addEventListener('click', () => this.showNextTestimonial());
    }

    showTestimonial(index) {
        const items = document.querySelectorAll('.testimonial-item');
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
        this.currentIndex = index;
    }

    showNextTestimonial() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }

    showPreviousTestimonial() {
        const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prevIndex);
    }

    startAutoRotation() {
        this.autoRotateInterval = setInterval(() => {
            this.showNextTestimonial();
        }, this.rotationSpeed);
    }

    stopAutoRotation() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
}

// Initialize testimonials when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const testimonialManager = new TestimonialManager();
    testimonialManager.loadTestimonials();
}); 