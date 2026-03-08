function copyLink() {
    // Get the current URL from the browser's address bar
    const shareUrl = window.location.href;

    // Use the Clipboard API to copy it
    navigator.clipboard.writeText(shareUrl).then(() => {
        // Visual Feedback (Crucial for User Experience)
        const shareBtn = document.querySelector('.share-btn');
    }).catch(err => {
        console.error('System Error: Could not copy link', err);
    });
}