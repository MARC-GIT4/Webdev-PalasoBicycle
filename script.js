// ==========================================
// 1. TAILWIND CONFIGURATION (Linked to CSS Variables)
// ==========================================
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    yellow: 'var(--brand-yellow)',
                    accent: 'var(--brand-accent-text)',
                    dark: 'var(--brand-dark)',
                    light: 'var(--brand-light)',
                    gray: 'var(--brand-gray)'
                }
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            }
        }
    }
};

// ==========================================
// 2. ACCESSIBLE MOBILE MENU TOGGLE
// ==========================================
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn.querySelector('i');

function toggleMenu(forceClose = false) {
    const isHidden = forceClose ? true : mobileMenu.classList.toggle('hidden');
    if (forceClose) mobileMenu.classList.add('hidden');

    // ARIA state for screen readers
    menuBtn.setAttribute('aria-expanded', String(!isHidden));

    // Swap icon between hamburger and X
    menuIcon.classList.toggle('ph-list', isHidden);
    menuIcon.classList.toggle('ph-x', !isHidden);
}

menuBtn.addEventListener('click', () => toggleMenu());

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
});

// ==========================================
// 3. NAVBAR SCROLL SHADOW
// ==========================================
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow-md', window.scrollY > 10);
});

// ==========================================
// 4. FORM VALIDATION
// ==========================================
const orderForm = document.getElementById('order-form');
const feedback = document.getElementById('form-feedback');

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('user-name').value.trim();
    const emailInput = document.getElementById('user-email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    feedback.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800');

    // Validate Name
    if (nameInput.length < 2) {
        feedback.textContent = 'Please enter your full name.';
        feedback.classList.add('bg-red-100', 'text-red-800');
        return;
    }

    // Validate Email
    if (!emailPattern.test(emailInput)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.classList.add('bg-red-100', 'text-red-800');
        return;
    }

    // Success State
    feedback.textContent = `Thanks, ${nameInput}! We've sent your quote and test-ride details to ${emailInput}.`;
    feedback.classList.add('bg-green-100', 'text-green-800');
    orderForm.reset();
});