let allPosts = []; 

async function loadArchive() {
    try {
        const response = await fetch('/blog/posts.json');
        allPosts = await response.json();
        
        // Initial render: show everything
        renderWindows(allPosts);
        
        // Build the sidebar based on the data
        renderSidebar(allPosts);
    } catch (err) {
        console.error("Archive Load Error:", err);
    }
}

function renderSidebar(posts) {
    const yearNav = document.getElementById('year-nav');
    const tagCloud = document.getElementById('tag-cloud');

    if (!yearNav || !tagCloud) return;

    // 1. Extract Unique Years
    // Maps the dates (2026-03-08) to just the year (2026), then removes duplicates
    const years = [...new Set(posts.map(p => p.date.split('-')[0]))].sort().reverse();

    // 2. Extract Unique Tags
    // Flattens the comma-separated tag strings into one big list of unique tags
    const tags = [...new Set(posts.flatMap(p => p.tags ? p.tags.split(', ') : []))].sort();

    // 3. Inject Years into Sidebar
    yearNav.innerHTML = years.map(year => `
        <li><a href="javascript:void(0)" onclick="filterByYear('${year}')">[ ${year} ]</a></li>
    `).join('');

    // 4. Inject Tags into Sidebar
    tagCloud.innerHTML = tags.map(tag => `
        <button class="tag-btn" onclick="filterByTag('${tag}')">#${tag}</button>
    `).join('');
}

function renderWindows(postsToDisplay) {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    container.innerHTML = postsToDisplay.map(post => `
        <article class="terminal-window">
            <section class="terminal-window">
                <div class="terminal-header" style="display: flex; align-items: center; background: rgba(255,255,255,0.05); padding: 8px 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                    <div class="dots" style="display: flex; gap: 6px;">
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;"></div>
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;"></div>
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: #27c93f;"></div>
                    </div>
                    <div class="text-secondary" style="margin-left: 15px; font-size: 0.7rem; opacity: 0.5; letter-spacing: 1px;">SECURE_TERMINAL</div>
                </div>

                <div class="terminal-body">
                    <div class="card-meta">${post.date} | ${post.reading_time}MIN_READ</div>
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-desc">${post.summary}</p>
                    <a href="${post.url.replace('.html', '')}" class="read-link">ACCESS_LOG -></a>
                </div>
            </section>
        </article>
    `).join('');
}

function filterByYear(year) {
    const filtered = allPosts.filter(p => p.date.startsWith(year));
    renderWindows(filtered);
    updateStatus(`YEAR: ${year}`);
}

function filterByTag(tag) {
    const filtered = allPosts.filter(p => p.tags && p.tags.includes(tag));
    renderWindows(filtered);
    updateStatus(`TAG: ${tag.toUpperCase()}`);
}

function updateStatus(text) {
    const status = document.getElementById('filter-status');
    if (status) status.innerText = `FILTER_ACTIVE: ${text}`;
}

// Start the process
document.addEventListener('DOMContentLoaded', loadArchive);