# Palaso Bicycle — Landing Page

A responsive single-page product landing page built for **Palaso Bicycle**. This project was developed as part of a 6-week web development plan, focusing on clean code separation, mobile responsiveness, interactive UI components, and web accessibility.

## Current Project Status

Everything from Weeks 1 to 5 (structure, responsive layout, interactivity, accessibility, and form handling) is implemented and working. 
* **Note:** Product and lifestyle images are currently using placeholder graphics and will be swapped out with final assets before deployment.

## What's Built So Far

* **Responsive Layout:** Mobile-first grid layout that adapts across phone, tablet, and desktop screens, complete with a toggleable mobile navigation menu.
* **ScrollSpy Navigation:** The fixed header tracks scroll position and highlights the active section (`Features`, `Details`, `Reviews`, `FAQ`) as you move down the page.
* **Interactive Hero Color Switcher:** Clicking the color tabs under the hero bike swaps the preview image, updates the label, and automatically syncs with the order form at the bottom of the page.
* **Conditional Quote & Test-Ride Form:** 
  * Validates user inputs (Name, Email, and Product selection) with clear field-level error borders and feedback messages.
  * Only displays the **Preferred Bicycle Color** dropdown when an actual bike model is selected (hides it automatically if the user selects *Accessories* or *Spare Parts*).
  * Includes a loading spinner state on submit and saves lead entries (`palaso_leads`) to the browser's `localStorage` (can also be inspected via the browser DevTools Console).
* **Single-Page Footer Routing:** 
  * Clicking **Product** links scrolls to the form and pre-selects that specific item.
  * Clicking **Support** links (`FAQ`, `Manuals`, `Warranty`) scrolls to the FAQ accordion and opens the matching answer.
  * Clicking **Legal** links (`Terms`, `Privacy`, `Cookies`) opens a lightweight modal overlay so users don't get sent to dead `#` links or separate pages.
* **Accessibility & Polish:** Includes a keyboard "Skip to main content" link, `Escape` key support for closing modals/menus, higher-contrast text variables, `prefers-reduced-motion` support, Open Graph meta tags for link previews, and an inline SVG favicon.

## Tech Stack

* **HTML5** (Semantic structure, ARIA attributes, Open Graph metadata)
* **CSS3 & Tailwind CSS (CDN)** (Custom CSS variables in `style.css` for easy brand color updates + Tailwind utility classes)
* **Vanilla JavaScript** (`script.js` for DOM manipulation, form validation, `IntersectionObserver` scroll animations, and `localStorage` state)
* **Google Fonts (`Poppins`) & Phosphor Icons**

## Project Structure

```text
├── index.html   # Main page structure, content, and meta tags
├── style.css    # Brand color variables, ScrollSpy underline, and animation rules
├── script.js    # Menu toggle, color switcher, FAQ accordion, modal, and form logic
└── README.md    # Project documentation
