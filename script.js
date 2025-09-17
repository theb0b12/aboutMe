// Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Smooth scrolling for navigation links
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            const offsetTop = section.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Add click event listeners to navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });

        // Animate statistics counter
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                element.textContent = target === 4.43 ? current.toFixed(2) : Math.floor(current);
                
                if (current >= target) {
                    element.textContent = target === 4.43 ? target.toFixed(2) : target;
                    clearInterval(timer);
                }
            }, 20);
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate stats counters
                    if (entry.target.classList.contains('stat-number')) {
                        const target = parseFloat(entry.target.getAttribute('data-target'));
                        animateCounter(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                    
                    // Animate skill progress bars
                    if (entry.target.classList.contains('skill-progress')) {
                        const width = entry.target.getAttribute('data-width');
                        entry.target.style.width = width + '%';
                        observer.unobserve(entry.target);
                    }
                    
                    // Add fade-in animation to cards
                    if (entry.target.classList.contains('skill-card') || 
                        entry.target.classList.contains('experience-card')) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                        
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animations
        document.addEventListener('DOMContentLoaded', () => {
            // Observe stat numbers
            document.querySelectorAll('.stat-number').forEach(stat => {
                observer.observe(stat);
            });
            
            // Observe skill progress bars
            document.querySelectorAll('.skill-progress').forEach(progress => {
                observer.observe(progress);
            });
            
            // Observe cards for fade-in animation
            document.querySelectorAll('.skill-card, .experience-card').forEach(card => {
                observer.observe(card);
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Contact form handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Show success message (in a real application, you'd send this to a server)
                alert('Thank you for your message! I\'ll get back to you soon.');
                
                // Reset form
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });