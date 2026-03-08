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
                <a href="${post.url.replace('.html', '')}" class="read-link">ACCESS_LOG -></a>
            </article>
        `).join('');

    } catch (err) {
        console.error("System Alert: Intel feed failed to synchronize.", err);
        const container = document.querySelector('.recent-posts-container');
        if (container) container.innerHTML = "<p>[ ERROR: ARCHIVE_CONNECTION_LOST ]</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadRecentIntel);