# Palaso Bicycle — Landing Page

**Live Website:** [https://palaso-bicycle.netlify.app](https://palaso-bicycle.netlify.app)

A responsive single-page landing page for **Palaso Bicycle**, built for my 6-week web development project. The goal was to take a landing page from initial layout to live deployment while keeping the HTML, CSS, and JavaScript separated, accessible, and easy to customize.

## Updated Features

* **Responsive Layout & Mobile Menu:** Adapts to mobile, tablet, and desktop screens with an accessible hamburger menu that closes automatically when a link is clicked or when pressing `Escape`.
* **ScrollSpy Navigation:** The top navbar tracks scroll position and highlights the active section (`Features`, `Details`, `Reviews`, `FAQ`) with an animated underline bar.
* **Interactive Hero Color Switcher:** Clicking the color swatches under the main bike image swaps the bike photo, updates the text label, and pre-selects that exact model and color in the bottom order form.
* **Smart Order & Test-Ride Form:**
  * **Field Validation:** Checks for a valid name, email address, and product selection before submitting, highlighting any missing or invalid fields in red.
  * **Conditional Color Dropdown:** The *Preferred Bicycle Color* field stays hidden at first and only shows up when an actual bike model is chosen (it hides itself if you select *Accessories* or *Spare Parts*).
  * **Button Loading State:** Disables the submit button and displays a spinning loader icon while the request is being saved.
  * **Netlify Forms + LocalStorage Backup:** Sends live submissions straight to the Netlify Forms dashboard when hosted online, and also saves a local copy (`palaso_leads`) in the browser's `localStorage`.
* **Single-Page Footer Routing (No Dead Links):**
  * **Product links** scroll down to the form and automatically select that product in the dropdown.
  * **Support links** (`FAQ`, `Manuals`, `Warranty`) scroll to the FAQ section and open that specific accordion tab.
  * **Legal links** (`Terms`, `Privacy`, `Cookies`) open a pop-up modal overlay so users don't get stuck on empty `#` links.
* **Accessibility & SEO Polish:**
  * Keyboard "Skip to main content" link and visible focus outlines.
  * Updated text contrast on yellow accents for readability.
  * `prefers-reduced-motion` support for scroll animations.
  * Open Graph meta tags for social link previews and an inline SVG favicon to prevent `404 favicon.ico` console errors.

## Tools & Tech Used

* **HTML5** (Semantic tags, ARIA attributes, Open Graph metadata, Netlify form attributes)
* **CSS3 & Tailwind CSS (CDN)** (`style.css` manages brand color variables, ScrollSpy styles, and scroll-reveal animations)
* **Vanilla JavaScript** (`script.js` handles the menu, color switcher, FAQ accordion, modal, ScrollSpy, and form logic)
* **Google Fonts (`Poppins`) & Phosphor Icons**
* **GitHub & Netlify** (Version control, continuous deployment, and serverless form capture)

## Project Files

```text
├── index.html   # Main HTML structure, meta tags, and page content
├── style.css    # Brand color variables, ScrollSpy underline, and animation rules
├── script.js    # Interactivity, form validation, and Netlify/localStorage logic
└── README.md    # Project overview and how-to guide
```

## How to Run Locally

You don't need to install Node.js or run any terminal build commands to open this project on your computer.

### Option 1: Open directly in your browser (Easiest)
1. Download or clone this repository to your computer.
2. Open the project folder in your file explorer.
3. Double-click **`index.html`** (or right-click it and select **Open with** -> Google Chrome, Edge, or Firefox).

### Option 2: Run with VS Code Live Server (For editing code)
1. Open the project folder in **VS Code**.
2. If you have the *Live Server* extension installed, right-click `index.html` and click **Open with Live Server** so your browser refreshes automatically whenever you save changes.

*(Note: Make sure you have an active internet connection when opening the file locally so the Tailwind CSS, Google Fonts, and Phosphor Icons CDN links load properly.)*

## How to View Submitted Forms

### 1. On the Live Netlify Site
1. Log in to [app.netlify.com](https://app.netlify.com) and click on the **Palaso Bicycle** project.
2. Go to **Forms** in the left sidebar and click **`palaso-orders`**.
3. You'll see all submitted names, emails, products, and colors listed there. You can also click **Download as CSV** in the top right to export the list to Excel.
4. *Tip:* If a test submission doesn't appear right away, click the **Verified submissions** filter dropdown at the top of the list and switch to **Spam submissions** in case Netlify's spam filter caught a test email.

### 2. In Your Browser (Local DevTools)
1. Fill out and submit the form at the bottom of the page.
2. Press `F12` (or right-click anywhere on the page and click **Inspect**) to open Developer Tools.
3. Check the **Console** tab (or go to **Application** -> **Local Storage**) to view the saved `palaso_leads` entries.
