// --- Auto Add Header and Footer to every HTML page ---
async function injectLayout() {
    // Inject Header
    const headerRes = await fetch('header.html');
    const headerHtml = await headerRes.text();
    document.getElementById('header-placeholder').innerHTML = headerHtml;

    // Inject Footer
    const footerRes = await fetch('footer.html');
    const footerHtml = await footerRes.text();
    document.getElementById('footer-placeholder').innerHTML = footerHtml;
}

document.addEventListener('DOMContentLoaded', injectLayout);

//Collapse Menu
let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");

toggle.addEventListener('click',function(){
    collapse.forEach(col=>col.classList.toggle("collapse-toggle"))
})

// Sticky Navigation
window.onscroll = function(){myFunction()};

// get current value
let navbar = document.getElementById("header");

// get the navbar position
let sticky = navbar.offsetTop;

// sticky function
function myFunction(){
    if(window.pageYOffset >= sticky){
        navbar.classList.add("sticky");
    }else{
        navbar.classList.remove("sticky");
    }
}


// --- Recent Blog Post Logic ---
async function loadRecentIntel() {
    try {
        const response = await fetch('./blog/posts.json');
        if (!response.ok) throw new Error("Source file unreachable.");
        const posts = await response.json();

        const container = document.querySelector('.recent-posts-container');
        if (!container) return; // Exit if we aren't on the homepage

        const recentPosts = posts.slice(0, 2);

        container.innerHTML = recentPosts.map(post => `
            <article class="intel-card">
                <div class="card-meta">${post.date} | ${post.reading_time}MIN_READ</div>
                <h4 class="card-title">${post.title}</h4>
                <p class="card-desc">${post.summary}</p>
                <a href="${post.url}" class="read-link">ACCESS_LOG -></a>
            </article>
        `).join('');

    } catch (err) {
        console.error("System Alert: Intel feed failed to synchronize.", err);
        const container = document.querySelector('.recent-posts-container');
        if (container) container.innerHTML = "<p>[ ERROR: ARCHIVE_CONNECTION_LOST ]</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadRecentIntel);