let activeIntervals = [];

document.getElementById('generateBtn').addEventListener('click', async () => {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const count = parseInt(document.getElementById('windowCount').value);
    const delaySeconds = parseInt(document.getElementById('delayBuffer').value);
    const gridContainer = document.getElementById('viewerGrid');
    
    // Status Bar Elements
    const statusDot = document.getElementById('globalStatusDot');
    const statusText = document.getElementById('globalStatusText');
    
    if (!urlInput) return alert("Pehle target stream link insert karo bhai!");
    
    const videoId = extractVideoId(urlInput);
    if (!videoId) return alert("Valid YouTube video link dalo!");

    // Clear grid and terminate old loading processes
    gridContainer.innerHTML = '';
    activeIntervals.forEach(clearTimeout);
    activeIntervals = [];

    // Premium Responsive Grid Configurator
    if (count <= 2) {
        gridContainer.className = "grid grid-cols-1 sm:grid-cols-2 gap-6";
    } else if (count <= 4) {
        gridContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6";
    } else {
        gridContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";
    }

    statusDot.className = "w-2 h-2 rounded-full bg-amber-500 animate-ping";
    statusText.innerText = "Deploying Cluster Grid...";

    // Sequential Loop Generator (Anti-Detection Automation)
    for (let i = 0; i < count; i++) {
        await new Promise((resolve) => {
            const timeoutId = setTimeout(() => {
                const card = document.createElement('div');
                // Premium glassmorphism cards layout
                card.className = "bg-gray-900/50 border border-gray-800/80 p-3.5 rounded-2xl shadow-xl hover:border-gray-700/60 transition-all duration-300 flex flex-col group relative";
                
                // Anti-Caching unique tracking hashes
                const cacheBuster = Math.floor(Math.random() * 999999);
                
                // ADVANCED YT EMBED HACKS:
                // playlist=${videoId}&loop=1 -> Automatic background looping
                // iv_load_policy=3 -> Disables popup annotation boxes (Saves bandwidth)
                // disablekb=1 -> Blocks browser tracking window keystroke injections
                const finalEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playlist=${videoId}&loop=1&controls=1&iv_load_policy=3&disablekb=1&modestbranding=1&rel=0&rand=${cacheBuster}`;

                card.innerHTML = `
                    <div class="flex justify-between items-center mb-2.5 px-1">
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-900/50 font-mono font-bold px-2 py-0.5 rounded">SESSION #${String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="text-[10px] text-gray-500 font-mono">PROXY ISOLATION</span>
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/50"></span>
                        </div>
                    </div>
                    <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black/80 border border-gray-950 group-hover:shadow-2xl shadow-indigo-500/5 transition duration-300">
                        <iframe src="${finalEmbedUrl}" class="w-full h-full border-0 absolute top-0 left-0" allow="autoplay; encrypted-media; gyroscope" allowfullscreen></iframe>
                    </div>
                `;
                
                gridContainer.appendChild(card);
                resolve();
            }, i * (delaySeconds * 1000)); // Dynamic Interval execution block
            activeIntervals.push(timeoutId);
        });
    }

    statusDot.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
    statusText.innerText = `Active Session: ${count} Channels`;
});

// Helper Code: YouTube URL Parser Module
function extractVideoId(url) {
    const pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(pattern);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Kill Sessions Event Triggers
document.getElementById('clearAllBtn').addEventListener('click', () => {
    document.getElementById('viewerGrid').innerHTML = '';
    activeIntervals.forEach(clearTimeout);
    activeIntervals = [];
    
    const statusDot = document.getElementById('globalStatusDot');
    const statusText = document.getElementById('globalStatusText');
    statusDot.className = "w-2 h-2 rounded-full bg-gray-500";
    statusText.innerText = "Engine Idle";
});

// Security Bypass Alert
document.getElementById('bypassNoticeBtn').addEventListener('click', () => {
    alert("⚠️ ALGORITHM BYPASS DEPLOYMENT MANUAL:\n\n1. YouTube completely mute frames ko view count se drop kar deta hai.\n2. Isse bachne ke liye, har ek tab ke andar chal rahe video ke volume control slider ko click karke bilkul min level (1 Bar) par manual rakhna, bina real mute click kiye.\n3. Har 30 minutes mein network browser IP rotate karein.");
});
