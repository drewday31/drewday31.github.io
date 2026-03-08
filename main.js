// --- Auto Add Header and Footer ---
async function injectLayout() {
    try {
        // Inject Header
        const headerRes = await fetch('/header.html');
        const headerHtml = await headerRes.text();
        const headerPlaceholder = document.getElementById('header-placeholder');
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHtml;
            
            // --- INITIALIZE HEADER FEATURES ---
            // We run these ONLY after the HTML exists on the page
            initMobileMenu();
            initStickyNav();
        }

        // Inject Footer
        const footerRes = await fetch('/footer.html');
        const footerHtml = await footerRes.text();
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;

    } catch (err) {
        console.error("System Error: Layout injection failed.", err);
    }
}

// Logic for Mobile Menu
function initMobileMenu() {
    let toggle = document.querySelector("#header .toggle-button");
    let collapse = document.querySelectorAll("#header .collapse");

    if (toggle) {
        toggle.addEventListener('click', function() {
            collapse.forEach(col => col.classList.toggle("collapse-toggle"));
        });
    }
}

// Logic for Sticky Nav
function initStickyNav() {
    let navbar = document.getElementById("header");
    if (!navbar) return;

    let sticky = navbar.offsetTop;

    window.onscroll = function() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    };
}

// Define copyLink here so it's globally available for your blog posts
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.querySelector('.share-btn');
        if (btn) {
            const oldText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> [ COPIED ]';
            setTimeout(() => { btn.innerHTML = oldText; }, 2000);
        }
    });
}

document.addEventListener('DOMContentLoaded', injectLayout);