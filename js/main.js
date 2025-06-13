document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Date range validation
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const packageSelect = document.getElementById('package');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    startDateInput.min = today;
    endDateInput.min = today;

    // Update end date minimum when start date changes
    startDateInput.addEventListener('change', () => {
        endDateInput.min = startDateInput.value;
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
            endDateInput.value = startDateInput.value;
        }
    });

    // Update package duration based on selection
    packageSelect.addEventListener('change', () => {
        const selectedOption = packageSelect.options[packageSelect.selectedIndex];
        const durationText = selectedOption.text.match(/\((\d+) days/);
        if (durationText) {
            const days = parseInt(durationText[1]);
            const startDate = new Date(startDateInput.value);
            if (startDate && !isNaN(startDate)) {
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + days - 1);
                endDateInput.value = endDate.toISOString().split('T')[0];
            }
        }
    });

    // Form validation
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate date range
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            const selectedPackage = packageSelect.options[packageSelect.selectedIndex];
            const durationText = selectedPackage.text.match(/\((\d+) days/);
            
            if (durationText) {
                const expectedDays = parseInt(durationText[1]);
                const actualDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                
                if (actualDays !== expectedDays) {
                    alert(`Please select dates that match the package duration of ${expectedDays} days.`);
                    return;
                }
            }

            // Add your form submission logic here
            alert('Thank you for your booking request! We will contact you shortly.');
            bookingForm.reset();
        });
    }

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavItem() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);
}); 