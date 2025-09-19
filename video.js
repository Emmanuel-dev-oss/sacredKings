// Video elements
const video = document.querySelector('.video-player');
const playBtn = document.querySelector('.play-btn');
const centerPlayBtn = document.querySelector('.play-pause-btn');
const skipForwardBtn = document.querySelector('.skip-forward-btn');
const skipBackwardBtn = document.querySelector('.skip-backward-btn');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const settingsBtn = document.querySelector('.settings-btn');
const settingsMenu = document.querySelector('.settings-menu');
const qualityBtn = document.querySelector('.quality-btn');
const qualityOptions = document.querySelector('.quality-options');
const speedBtn = document.querySelector('.speed-btn');
const speedOptions = document.querySelector('.speed-options');

// Play/Pause functionality
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '<span class="icon-pause"></span>';
        centerPlayBtn.innerHTML = '<span class="icon-pause"></span>';
    } else {
        video.pause();
        playBtn.innerHTML = '<span class="icon-play"></span>';
        centerPlayBtn.innerHTML = '<span class="icon-play"></span>';
    }
}

playBtn.addEventListener('click', togglePlay);
centerPlayBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// Skip forward/backward functionality
function skipForward() {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
}

function skipBackward() {
    video.currentTime = Math.max(0, video.currentTime - 10);
}

skipForwardBtn.addEventListener('click', skipForward);
skipBackwardBtn.addEventListener('click', skipBackward);

// Update play/pause button when video plays/pauses
video.addEventListener('play', () => {
    playBtn.innerHTML = '<span class="icon-pause"></span>';
    centerPlayBtn.innerHTML = '<span class="icon-pause"></span>';
});

video.addEventListener('pause', () => {
    playBtn.innerHTML = '<span class="icon-play"></span>';
    centerPlayBtn.innerHTML = '<span class="icon-play"></span>';
});

// Volume controls
function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
        volumeBtn.innerHTML = '<span class="icon-mute"></span>';
        volumeSlider.value = 0;
    } else {
        volumeBtn.innerHTML = '<span class="icon-volume"></span>';
        volumeSlider.value = video.volume;
    }
}

volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    updateVolumeIcon();
});

volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    video.muted = false;
    updateVolumeIcon();
});

// Update progress bar
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
    
    // Update time displays
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    
    // Only update duration if it's available
    if (!isNaN(video.duration)) {
        durationDisplay.textContent = formatTime(video.duration);
    }
}

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('loadedmetadata', updateProgress);

// Click on progress bar to seek
function seek(e) {
    const percent = e.offsetX / progressContainer.offsetWidth;
    video.currentTime = percent * video.duration;
}

progressContainer.addEventListener('click', seek);

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.querySelector('.video-container').requestFullscreen()
            .then(() => {
                fullscreenBtn.innerHTML = '<span class="icon-exit-fullscreen"></span>';
            })
            .catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = '<span class="icon-fullscreen"></span>';
    }
}

fullscreenBtn.addEventListener('click', toggleFullscreen);

// Update fullscreen button when entering/exiting fullscreen
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenBtn.innerHTML = '<span class="icon-exit-fullscreen"></span>';
    } else {
        fullscreenBtn.innerHTML = '<span class="icon-fullscreen"></span>';
    }
});

// Settings menu
settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle('active');
});

// Quality options
qualityBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    qualityOptions.classList.toggle('active');
    speedOptions.style.display = 'none';
});

// Speed options
speedBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    speedOptions.style.display = speedOptions.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.speed-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const speed = parseFloat(option.dataset.speed);
        video.playbackRate = speed;
        speedBtn.textContent = `Speed: ${speed}x`;
        speedOptions.style.display = 'none';
    });
});

// Close settings when clicking outside
document.addEventListener('click', () => {
    settingsMenu.classList.remove('active');
    qualityOptions.classList.remove('active');
    speedOptions.style.display = 'none';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space for play/pause
    if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
    }
    
    // Arrow keys for seeking
    if (e.code === 'ArrowLeft') {
        skipBackward();
    }
    
    if (e.code === 'ArrowRight') {
        skipForward();
    }
    
    // M for mute
    if (e.code === 'KeyM') {
        video.muted = !video.muted;
        updateVolumeIcon();
    }
    
    // F for fullscreen
    if (e.code === 'KeyF') {
        toggleFullscreen();
    }
});

// Initialize volume icon
updateVolumeIcon();

//The Video Indicator Functionaality
const videoContainer = document.querySelector('.video-container');

// Hide indicator when video starts playing
video.addEventListener('play', () => {
    videoContainer.classList.add('video-playing');
});

// Show indicator when video is paused
video.addEventListener('pause', () => {
    videoContainer.classList.remove('video-playing');
});