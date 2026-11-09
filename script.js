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
// 6. ACCESSIBLE LEGAL MODAL
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
const closeModalBtn = document.getElementById('close-modal-btn');
let lastFocusedElement = null;

function closeLegalModal() {
    legalModal.classList.add('hidden');
    if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('[data-legal]').forEach(btn => {
    btn.addEventListener('click', () => {
        lastFocusedElement = btn;
        const key = btn.getAttribute('data-legal');
        modalTitle.textContent = legalData[key].title;
        modalBody.textContent = legalData[key].body;
        legalModal.classList.remove('hidden');
        closeModalBtn.focus(); // Move keyboard focus inside modal
    });
});

closeModalBtn.addEventListener('click', closeLegalModal);
document.getElementById('modal-ok-btn').addEventListener('click', closeLegalModal);
legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) closeLegalModal();
});

// Closes Modal or Mobile Menu when pressing the Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!legalModal.classList.contains('hidden')) closeLegalModal();
        if (!mobileMenu.classList.contains('hidden')) {
            toggleMenu(true);
            menuBtn.focus();
        }
    }
});

// ==========================================
// 7. FORM VALIDATION WITH FIELD HIGHLIGHTING
// ==========================================
const orderForm = document.getElementById('order-form');
const emailInput = document.getElementById('user-email');
const feedback = document.getElementById('form-feedback');

function setFieldError(inputEl, hasError) {
    inputEl.classList.toggle('border-red-500', hasError);
    inputEl.classList.toggle('ring-2', hasError);
    inputEl.classList.toggle('ring-red-200', hasError);
    inputEl.setAttribute('aria-invalid', String(hasError));
}

// Clear red error border as soon as user starts typing
[nameInput, emailInput].forEach(input => {
    input.addEventListener('input', () => setFieldError(input, false));
});

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const selectedProduct = modelSelect.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    feedback.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800');
    setFieldError(nameInput, false);
    setFieldError(emailInput, false);

    if (nameVal.length < 2) {
        setFieldError(nameInput, true);
        nameInput.focus();
        feedback.textContent = 'Please enter your full name (at least 2 characters).';
        feedback.classList.add('bg-red-100', 'text-red-800');
        return;
    }

    if (!emailPattern.test(emailVal)) {
        setFieldError(emailInput, true);
        emailInput.focus();
        feedback.textContent = 'Please enter a valid email address (e.g., alex@example.com).';
        feedback.classList.add('bg-red-100', 'text-red-800');
        return;
    }

    feedback.textContent = `Thanks, ${nameVal}! Your Palaso Bicycle request for "${selectedProduct}" has been sent to ${emailVal}.`;
    feedback.classList.add('bg-green-100', 'text-green-800');
    orderForm.reset();
});

// ==========================================
// 8. INTERACTIVE HERO COLOR SWITCHER TABS
// ==========================================
const colorTabs = document.querySelectorAll('.color-tab');
const heroBikeImg = document.getElementById('hero-bike-img');
const colorLabel = document.getElementById('selected-color-label');

colorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const colorName = tab.getAttribute('data-color-name');
        const imgSrc = tab.getAttribute('data-img-src');
        const modelVal = tab.getAttribute('data-model-value');

        // Update active ring state and ARIA attributes
        colorTabs.forEach(t => {
            t.classList.remove('ring-2', 'ring-brand-dark');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('ring-2', 'ring-brand-dark');
        tab.setAttribute('aria-selected', 'true');

        // Swap Hero Image and Label
        heroBikeImg.src = imgSrc;
        heroBikeImg.alt = `${colorName} 2026 Palaso Bicycle cargo e-bike side profile`;
        colorLabel.textContent = `Color: ${colorName}`;

        // Sync selection with the bottom Order Form dropdown
        if (modelSelect) modelSelect.value = modelVal;
    });
});

// ==========================================
// 9. SCROLL REVEAL ANIMATION
// ==========================================
const revealSections = document.querySelectorAll('#features, #details, #reviews, #faq, #buy');

revealSections.forEach(sec => sec.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealSections.forEach(sec => revealObserver.observe(sec));
