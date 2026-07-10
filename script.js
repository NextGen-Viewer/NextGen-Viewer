function addVideos() {
    let url = document.getElementById('ytLink').value.trim();
    let count = parseInt(document.getElementById('tabCount').value);
    let container = document.getElementById('videoContainer');
    
    container.innerHTML = '';

    let videoId = "";
    if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1].split("?")[0];
    }

    if (!videoId || videoId.length !== 11) {
        alert("Sahi YouTube link enter karein!");
        return;
    }

    if (isNaN(count) || count < 1) {
        alert("Please tabs enter karein!");
        return;
    }

    if (count > 25) {
        alert("Max 25 tabs hi chalayein!");
        return;
    }

    for (let i = 0; i < count; i++) {
        let wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        
        // controls=1 aur modestbranding=0 kiya hai taaki volume aur proper settings button dikhe
        wrapper.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=0&playlist=${videoId}&loop=1" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
            </iframe>
        `;
        container.appendChild(wrapper);
    }
}
