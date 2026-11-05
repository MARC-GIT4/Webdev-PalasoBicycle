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
// 4. FAQ ACCORDION + SUPPORT FOOTER LINKS
// ==========================================
const faqButtons = document.querySelectorAll('.faq-btn');

function openFaqItem(targetId, forceOpen = false) {
    faqButtons.forEach(btn => {
        const contentId = btn.getAttribute('data-faq');
        const contentEl = document.getElementById(contentId);
        const icon = btn.querySelector('i');

        if (contentId === targetId) {
            const shouldOpen = forceOpen ? true : contentEl.classList.contains('hidden');
            contentEl.classList.toggle('hidden', !shouldOpen);
            btn.setAttribute('aria-expanded', String(shouldOpen));
            icon.classList.toggle('rotate-180', shouldOpen);
        } else {
            contentEl.classList.add('hidden');
            btn.setAttribute('aria-expanded', 'false');
            icon.classList.remove('rotate-180');
        }
    });
}

faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        openFaqItem(btn.getAttribute('data-faq'));
    });
});

// When clicking Support links in the footer (FAQ, Manuals, Warranty), open that exact accordion item
document.querySelectorAll('[data-open-faq]').forEach(link => {
    link.addEventListener('click', () => {
        const targetFaq = link.getAttribute('data-open-faq');
        openFaqItem(targetFaq, true);
    });
});

// ==========================================
// 5. PRODUCT & CONTACT FOOTER LINKS
// ==========================================
const modelSelect = document.getElementById('bike-model');
const nameInput = document.getElementById('user-name');

// Clicking a Product in the footer selects it in the form automatically
document.querySelectorAll('[data-select-product]').forEach(link => {
    link.addEventListener('click', () => {
        modelSelect.value = link.getAttribute('data-select-product');
        setTimeout(() => modelSelect.focus(), 500);
    });
});

// Clicking "Contact Us" focuses the form name field
document.getElementById('footer-contact-link').addEventListener('click', () => {
    setTimeout(() => nameInput.focus(), 500);
});

// ==========================================
// 6. LEGAL MODAL (HANDLES FOOTER LEGAL LINKS)
// ==========================================
const legalData = {
    terms: {
        title: 'Terms of Service — Palaso Bicycle',
        body: 'By ordering or booking a test ride with Palaso Bicycle, you agree to our standard 14-day return policy and rider safety guidelines. All bikes are built to comply with local electric assist speed limits (25 km/h).'
    },
    privacy: {
        title: 'Privacy Policy — Palaso Bicycle',
        body: 'Palaso Bicycle respects your privacy. Name and email details submitted through our quote and test-ride form are used strictly to schedule your consultation and are never sold or shared with third-party advertisers.'
    },
    cookies: {
        title: 'Cookie Policy — Palaso Bicycle',
        body: 'This landing page uses minimal functional storage to ensure smooth navigation and form validation. We do not use intrusive cross-site tracking cookies.'
    }
};

const legalModal = document.getElementById('legal-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

function closeLegalModal() {
    legalModal.classList.add('hidden');
}

document.querySelectorAll('[data-legal]').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-legal');
        modalTitle.textContent = legalData[key].title;
        modalBody.textContent = legalData[key].body;
        legalModal.classList.remove('hidden');
    });
});

document.getElementById('close-modal-btn').addEventListener('click', closeLegalModal);
document.getElementById('modal-ok-btn').addEventListener('click', closeLegalModal);
legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) closeLegalModal();
});

// ==========================================
// 7. FORM VALIDATION
// ==========================================
const orderForm = document.getElementById('order-form');
const feedback = document.getElementById('form-feedback');

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = document.getElementById('user-email').value.trim();
    const selectedProduct = modelSelect.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    feedback.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800');

    // Validate Name
    if (nameVal.length < 2) {
        feedback.textContent = 'Please enter your full name.';
        feedback.classList.add('bg-red-100', 'text-red-800');
        return;
    }

    // Validate Email
    if (!emailPattern.test(emailVal)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.classList.add('bg-red-100', 'text-red-800');
        return;
    }

    // Success State
    feedback.textContent = `Thanks, ${nameVal}! Your Palaso Bicycle request for "${selectedProduct}" has been sent to ${emailVal}.`;
    feedback.classList.add('bg-green-100', 'text-green-800');
    orderForm.reset();
});
