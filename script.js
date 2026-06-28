// --- DATA ---
const SERVICES = [
    { id: "web-dev", title: "Website Development", desc: "High-performance websites built from scratch. Lightning fast speeds and absolute pristine design logic to skyrocket conversions.", icon: "layout", delivery: "48-72 Hours", features: ["Custom Design", "SEO Optimized", "Responsive"] },
    { id: "landing-page", title: "Landing Pages SPA", desc: "Single Page Applications focused purely on user conversion. Excellent for product launches and focused marketing funnels.", icon: "monitor-play", delivery: "24 Hours", features: ["High Conversion", "A/B Testing Ready", "Fast Load"] },
    { id: "dashboard", title: "Dashboard UI/UX", desc: "Complex dashboard interfaces made simple. We design data-heavy administration panels that feel like consumer apps.", icon: "pie-chart", delivery: "72 Hours", features: ["Figma Files", "Prototyping", "Component Library"] },
    { id: "thumbnails", title: "YouTube Thumbnails", desc: "Click-through-rate optimized thumbnail designs for high-performing video creators and corporate channels.", icon: "youtube", delivery: "12 Hours", features: ["A/B Variations", "High Contrast", "CTR Focus"] },
    { id: "posters", title: "Posters & Graphics", desc: "Stunning promotional graphics for offline events, online social media campaigns, and digital advertising grids.", icon: "image", delivery: "24 Hours", features: ["Print Ready", "Social Media Fit", "Brand Alignment"] }
];

const FAQS = [
    { category: "Process", q: "How fast do you deliver?", a: "For most landing pages and websites, we deploy the first functional version within 48-72 hours. We don't believe in artificial agency delays." },
    { category: "Process", q: "How do we communicate?", a: "Direct WhatsApp communication. You will have a dedicated line directly to the engineering and design leads working on your platform." },
    { category: "Technical", q: "Do you use templates?", a: "No. Everything is custom-coded and designed specifically for your brand using state-of-the-art frameworks to ensure 100% unique delivery." },
    { category: "Support", q: "Do you offer post-launch support?", a: "Yes. Every project comes with 30 days of high-priority support. We ensure everything remains smooth and make necessary adjustments." }
];

const TIMELINE = [
    { step: 1, title: "1. The Briefing", description: "You fill out our direct WhatsApp form to give us a brief rundown of what you need. We review it instantly.", details: "No meetings necessary unless requested. We operate purely on efficiency." },
    { step: 2, title: "2. Strategic Alignment", description: "We send back a quick summary and approach plan. Once you agree, our designers open Figma.", details: "We define the exact structure of your conversion funnel before writing code." },
    { step: 3, title: "3. Pure Design Flow", description: "We create the visual structure, layout, typography, and color systems tailored to your startup.", details: "You get access to a live link to see the design taking shape in real time." },
    { step: 4, title: "4. Code Implementation", description: "We convert the approved design into blazingly fast code with perfect animations and responsiveness.", details: "We use modern frameworks to guarantee 100/100 Google Lighthouse scores." },
    { step: 5, title: "5. Try It Live", description: "Click around and test your active website on our safe private link before going public.", details: "We fine-tune the button animations, contact forms, and make sure it looks perfect on phones." },
    { step: 6, title: "6. Launch and Grow!", description: "We hook up your domain, set up your Google search tags, and push your site live to the world.", details: "We share clear, short screen recordings of how to change text by yourself whenever you like." }
];

// --- APP STATE ---
let currentPage = 'home';
let activeFaqCategory = 'all';

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    setupEventListeners();
    lucide.createIcons();
    setup3DReveal();
});

function renderAll() {
    renderServices();
    renderTimeline();
    renderFaqs();
}

// --- NAVIGATION ---
function showPage(pageId) {
    currentPage = pageId;
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(`page-${pageId}`).classList.remove('hidden');

    document.querySelectorAll('.desktop-nav .nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(pageId.split('-')[0])) {
            btn.classList.add('active');
        }
    });

    if (pageId === 'home') document.querySelectorAll('.nav-btn')[0].classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isMobileMenuOpen) toggleMobileMenu();

    // Re-trigger animations
    setTimeout(() => {
        setup3DReveal();
        document.querySelectorAll('.reveal-3d').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) el.classList.add('active');
        });
    }, 50);
}

let isMobileMenuOpen = false;
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (isMobileMenuOpen) {
        menu.classList.remove('hidden');
        icon.setAttribute('data-lucide', 'x');
    } else {
        menu.classList.add('hidden');
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
}

function scrollToEnquiry() {
    showPage('home');
    setTimeout(() => {
        const el = document.getElementById('enquiry-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// --- COMPARISON ---
function renderComparison() {
    const points = [
        { feature: "Code Structure", old: "Bulky Builders", new: "Custom Clean Code" },
        { feature: "Load Time", old: "3s - 5s (Loss of Sales)", new: "Under 1 Second" },
        { feature: "Mobile View", old: "Often Breaks", new: "Pixel Perfect" },
        { feature: "Updates", old: "Complex Dashboard", new: "Easy Video Guides" },
        { feature: "Client Support", old: "Ticketing System", new: "Direct WhatsApp" },
        { feature: "Delivery Speed", old: "3 - 5 Weeks", new: "2 - 5 Days", crucial: true }
    ];

    const container = document.getElementById('comparison-rows');
    if (!container) return;

    let html = '';
    points.forEach(p => {
        html += `
        <div class="comp-row ${p.crucial ? 'crucial' : ''}">
            <div class="row-feature"><h4>${p.feature}</h4></div>
            <div class="row-old">${p.old}</div>
            <div class="row-new"><i data-lucide="${p.crucial ? 'zap' : 'check'}"></i> ${p.new}</div>
        </div>
        `;
    });
    container.innerHTML = html;
}

// --- SERVICES ---
function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    let html = '';
    SERVICES.forEach(s => {
        html += `
        <div class="service-card reveal-3d">
            <div class="service-icon"><i data-lucide="${s.icon}"></i></div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.desc}</p>
            <ul class="service-benefits">
                ${s.features.map(f => `<li><i data-lucide="check"></i> ${f}</li>`).join('')}
            </ul>
            <div class="service-footer">
                <a href="#" class="service-link" onclick="scrollToEnquiry()">Enquire ➔</a>
            </div>
        </div>
        `;
    });
    grid.innerHTML = html;
}

// --- PROCESS TIMELINE ---
function renderTimeline() {
    const grid = document.getElementById('timeline-grid');
    if (!grid) return;

    let html = '';
    TIMELINE.forEach(t => {
        html += `
        <div class="timeline-step">
            <div class="step-num">${t.step}</div>
            <h3 style="margin-bottom:1rem; font-size:1.3rem; color:#002147;">${t.title}</h3>
            <p style="margin-bottom:1rem; color:#0f172a; font-weight:bold;">${t.description}</p>
            <p style="font-size:0.9rem; color:#475569;">${t.details}</p>
        </div>
        `;
    });
    grid.innerHTML = html;
}

// --- FAQS ---
function renderFaqs() {
    const cats = ['all', ...new Set(FAQS.map(f => f.category))];
    const catContainer = document.getElementById('faq-categories');
    const accContainer = document.getElementById('faq-accordion');

    if (!catContainer || !accContainer) return;

    catContainer.innerHTML = cats.map(c =>
        `<button class="filter-btn ${c === activeFaqCategory ? 'active' : ''}" onclick="setFaqCat('${c}')">${c}</button>`
    ).join('');

    const filtered = activeFaqCategory === 'all' ? FAQS : FAQS.filter(f => f.category === activeFaqCategory);

    accContainer.innerHTML = filtered.map((f, i) => `
        <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(${i})">
                <span>${f.q}</span>
                <i data-lucide="chevron-down" id="faq-icon-${i}"></i>
            </button>
            <div class="faq-answer hidden" id="faq-ans-${i}">${f.a}</div>
        </div>
    `).join('');
    lucide.createIcons();
}

function setFaqCat(cat) {
    activeFaqCategory = cat;
    renderFaqs();
}

function toggleFaq(index) {
    const ans = document.getElementById(`faq-ans-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    if (ans.classList.contains('hidden')) {
        ans.classList.remove('hidden');
        icon.setAttribute('data-lucide', 'chevron-up');
    } else {
        ans.classList.add('hidden');
        icon.setAttribute('data-lucide', 'chevron-down');
    }
    lucide.createIcons();
}

// --- 3D REVEAL ANIMATIONS ---
function setup3DReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal-3d').forEach(el => observer.observe(el));
}

// --- EVENTS ---
function setupEventListeners() {
    renderComparison();

    // Before/After Slider
    const container = document.getElementById('before-after-container');
    const handle = document.getElementById('slider-handle');
    const afterLayer = document.getElementById('after-layer');
    const afterContent = document.getElementById('after-content');

    if (container) {
        let isDragging = false;

        function setSliderPos(x) {
            const rect = container.getBoundingClientRect();
            let pos = x - rect.left;
            if (pos < 0) pos = 0;
            if (pos > rect.width) pos = rect.width;
            const percent = (pos / rect.width) * 100;

            handle.style.left = `${percent}%`;
            afterLayer.style.width = `${percent}%`;
            afterContent.style.width = `${rect.width}px`;
        }

        handle.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => { if (isDragging) setSliderPos(e.clientX); });

        handle.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => { if (isDragging) setSliderPos(e.touches[0].clientX); });
    }

    // Dynamic 3D Mouse Tracker for Hero Logo
    const heroLogo = document.querySelector('.hero-logo-img');
    if (heroLogo) {
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 1024) {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
                heroLogo.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            }
        });

        document.addEventListener('mouseleave', () => {
            heroLogo.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }

    // WhatsApp form
    const waForm = document.getElementById('wa-enquiry-form');
    if (waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('wa-name').value.trim();
            const phone = document.getElementById('wa-phone').value.trim();
            const msg = document.getElementById('wa-message').value.trim();
            const termsChecked = document.getElementById('wa-terms').checked;

            if (!termsChecked) return;

            // Show automated reply
            document.getElementById('wa-enquiry-form').classList.add('hidden');
            document.getElementById('wa-client-name').innerText = name;
            document.getElementById('wa-client-phone').innerText = phone;
            document.getElementById('wa-success').classList.remove('hidden');
            lucide.createIcons();

            // Open WhatsApp after short delay
            const waMsg = encodeURIComponent(`Hi TweeTech! I'm ${name} (${phone}). I have read & agree to your T&C.\n\nMy enquiry:\n${msg}`);
            setTimeout(() => {
                window.open(`https://wa.me/917016253913?text=${waMsg}`, '_blank');
            }, 1500);
        });
    }
}

function resetEnquiryForm() {
    document.getElementById('wa-enquiry-form').classList.remove('hidden');
    document.getElementById('wa-success').classList.add('hidden');
    document.getElementById('wa-enquiry-form').reset();
}

function setupNewsletterListener() {
    const newsletterForm = document.getElementById('footer-newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i>';
            lucide.createIcons();
            e.target.reset();
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                lucide.createIcons();
            }, 3000);
        });
    }
}

document.addEventListener('DOMContentLoaded', setupNewsletterListener);
