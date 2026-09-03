/* ============================================
   Cyber Auto Care - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Set minimum date for booking to today
    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Booking form handling
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const carBrand = formData.get('car_brand');
            const carColor = formData.get('car_color');
            const service = formData.get('service');
            const date = formData.get('date');
            const time = formData.get('time');
            const notes = formData.get('notes') || 'None';
            
            // Format date nicely
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-MY', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // Create WhatsApp message
            const whatsappMessage = `Hi Cyber Auto Care! 

I'd like to book a car service appointment.

*Customer Details:*
Name: ${name}
Phone: ${phone}

*Car Details:*
Brand: ${carBrand}
Color: ${carColor}

*Service Details:*
Service: ${service}
Date: ${formattedDate}
Time: ${time}

*Additional Notes:*
${notes}

Please confirm my booking. Thank you!`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/60124358184?text=${encodedMessage}`, '_blank');
            
            alert('Opening WhatsApp to confirm your booking!');
            bookingForm.reset();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .gallery-item').forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-target {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    console.log('Cyber Auto Care website loaded successfully!');
});
