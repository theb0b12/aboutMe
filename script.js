// ── Mobile Navigation ──────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ── Smooth Scroll ───────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id      = link.getAttribute('href').substring(1);
        const section = document.getElementById(id);
        if (!section) return;
        window.scrollTo({
            top: section.offsetTop - 56,   // 56px = navbar height
            behavior: 'smooth'
        });
    });
});

// ── Counter Animation ───────────────────────────────────────
function animateCounter(el, target) {
    const increment = target / 80;
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target === 4.43 ? target.toFixed(2) : target;
            clearInterval(timer);
        } else {
            el.textContent = target === 4.43 ? current.toFixed(2) : Math.floor(current);
        }
    }, 20);
}

// ── Intersection Observer ───────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (entry.target.classList.contains('stat-number')) {
            const target = parseFloat(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }

        if (entry.target.classList.contains('skill-progress')) {
            entry.target.style.width = entry.target.getAttribute('data-width') + '%';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-number').forEach(el  => observer.observe(el));
    document.querySelectorAll('.skill-progress').forEach(el => observer.observe(el));
});

// ── Copy Button ─────────────────────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy');
        try {
            await navigator.clipboard.writeText(text);
            const original = btn.textContent;
            btn.textContent = 'Copied';
            btn.classList.add('copy-btn--success');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('copy-btn--success');
            }, 2000);
        } catch {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity  = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            btn.textContent = 'Copied';
            setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
        }
    });
});
