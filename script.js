function addVideos() {
    let url = document.getElementById('ytLink').value.trim();
    let count = parseInt(document.getElementById('tabCount').value);
    let container = document.getElementById('videoContainer');
    let unmuteBtn = document.getElementById('unmuteBtn');
    
    container.innerHTML = '';
    if (unmuteBtn) unmuteBtn.style.display = 'none';

    // Global variable mein videoId store kar rahe hain taaki unmute button ise use kar sake
    window.currentVideoId = "";
    if (url.includes("v=")) {
        window.currentVideoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        window.currentVideoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("embed/")) {
        window.currentVideoId = url.split("embed/")[1].split("?")[0];
    }

    if (!window.currentVideoId || window.currentVideoId.length !== 11) {
        alert("Sahi YouTube link enter karein!");
        return;
    }

    if (isNaN(count) || count < 1) {
        alert("Please tabs enter karein!");
        return;
    }

    if (count > 25) {
        alert("Performance ke liye ek baar mein max 25 tabs hi chalayein!");
        return;
    }

    // Shuruat mein mute=1 ke sath tabs load honge (Autoplay strict rule bypass ke liye)
    for (let i = 0; i < count; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        wrapper.innerHTML = `
            <iframe id="yt-frame-${i}" 
                    src="https://www.youtube.com/embed/${window.currentVideoId}?autoplay=1&mute=1&playlist=${window.currentVideoId}&loop=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        container.appendChild(wrapper);
    }

    if (count > 0 && unmuteBtn) {
        unmuteBtn.style.display = 'inline-block';
    }
}

// 🔊 Foolproof Unmute Logic: Iframe URLs ko mute=0 ke sath force-reload karna
function unmuteAllVideos() {
    let iframes = document.querySelectorAll('.video-wrapper iframe');
    
    if (iframes.length === 0) {
        alert("Pehle videos load karein!");
        return;
    }

    if (window.currentVideoId) {
        iframes.forEach((iframe, index) => {
            // Direct URL update with mute=0 (Isse browser block nahi kar payega aur 100% sound aayegi)
            iframe.src = `https://www.youtube.com/embed/${window.currentVideoId}?autoplay=1&mute=0&playlist=${window.currentVideoId}&loop=1`;
        });
        alert("Saare tabs ka volume 100% open kar diya gaya hai!");
    } else {
        alert("Koi video ID nahi mili!");
    }
}
