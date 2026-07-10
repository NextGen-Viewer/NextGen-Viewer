function addVideos() {
    let url = document.getElementById('ytLink').value.trim();
    let count = parseInt(document.getElementById('tabCount').value);
    let container = document.getElementById('videoContainer');
    let unmuteBtn = document.getElementById('unmuteBtn');
    
    // Pehle container aur button ko reset karein
    container.innerHTML = '';
    if (unmuteBtn) unmuteBtn.style.display = 'none';

    // Simple aur solid Video ID extractor (Jo block nahi hoga)
    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1].split("?")[0];
    }

    // Validation check
    if (!videoId || videoId.length !== 11) {
        alert("Sahi YouTube link enter karein! Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        return;
    }

    if (isNaN(count) || count < 1) {
        alert("Please tabs ki sankhya enter karein!");
        return;
    }

    if (count > 25) {
        alert("Performance ke liye ek baar mein max 25 tabs hi chalayein!");
        return;
    }

    // Saare tabs loop aur JS API ke sath generate karna
    for (let i = 0; i < count; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        
        // Isme loop, playlist, autoplay, mute aur enablejsapi sab kuch add hai!
        wrapper.innerHTML = `
            <iframe id="yt-frame-${i}" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&playlist=${videoId}&loop=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        container.appendChild(wrapper);
    }

    // Videos load hote hi Unmute button show ho jayega
    if (count > 0 && unmuteBtn) {
        unmuteBtn.style.display = 'inline-block';
    }
}

// Saare tabs ko ek sath unmute karne ka premium logic
function unmuteAllVideos() {
    let iframes = document.querySelectorAll('.video-wrapper iframe');
    
    if (iframes.length === 0) {
        alert("Pehle videos play karein!");
        return;
    }

    iframes.forEach(iframe => {
        // YouTube API standard command to unmute & set volume to 50%
        iframe.contentWindow.postMessage('{"event":"command","func":"unmute","args":""}', '*');
        iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[50]}', '*');
    });
    
    alert("Saare tabs ka volume open kar diya gaya hai! Enjoy.");
}
