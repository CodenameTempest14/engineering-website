const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById ('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const lyricsContainer = document.getElementById('lyrics-container');
const volumeIcon = document.getElementById('volumeIcon');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

const lyrics = [
  { time: 3, text: "Do you hear me? I'm talking to you" },
  { time: 7, text: "Across the water across" },
  { time: 9, text: "the deep blue ocean" },
  { time: 12, text: "Under the open sky, oh my, baby, I'm trying" },
  { time: 18, text: "Boy, I hear you in my dreams" },
  { time: 22, text: "I feel your whisper across the sea" },
  { time: 25, text: "I keep you with me in my heart" },
  { time: 29, text: "You make it easier when life gets hard" },
  { time: 33, text: "Lucky I'm in love with my best friend" },
  { time: 37, text: "Lucky to have been where I have been" },
  { time: 41, text: "Lucky to be coming home again" },
  { time: 47, text: "Ooh-ooh-ooh, ooh-ooh, ooh-ooh" },
  { time: 55, text: "They don't know how long it takes" },
  { time: 59, text: "Waiting for a love like this" },
  { time: 63, text: "Every time we say goodbye" },
  { time: 67, text: "I wish we had one more kiss" },
  { time: 70, text: "I'll wait for you, I promise you, I will" },
  { time: 77, text: "I'm lucky I'm in love with my best friend" },
  { time: 82, text: "Lucky to have been where I have been" },
  { time: 85, text: "Lucky to be coming home again" },
  { time: 93, text: "Lucky we're in love in every way" },
  { time: 97, text: "Lucky to have stayed where we have stayed" },
  { time: 100, text: "Lucky to be coming home someday" },
  { time: 106, text: "And so I'm sailing through the sea" },
  { time: 110, text: "To an island where we'll meet" },
  { time: 113, text: "You'll hear the music fill the air" },
  { time: 117, text: "I'll put a flower in your hair" },
  { time: 121, text: "Though the breezes, through the trees" },
  { time: 124, text: "Move so pretty you're all I see" },
  { time: 128, text: "As the world keeps spinning round" },
  { time: 133, text: "You hold me right here right now" },
  { time: 137, text: "Lucky I'm in love with my best friend" },
  { time: 141, text: "Lucky to have been where I have been" },
  { time: 145, text: "Lucky to be coming home again" },
  { time: 151, text: "I'm lucky we're in love in every way" },
  { time: 156, text: "Lucky to have stayed where we have stayed" },
  { time: 160, text: "Lucky to be coming home someday" },
  { time: 166, text: "Ooh-ooh-ooh, ooh-ooh, ooh-ooh" },
  { time: 173, text: "Ooh-ooh-ooh, ooh-ooh, ooh-ooh" },
  { time: 179, text: "Ooh-ooh-ooh" }

];

audio.addEventListener('timeupdate', () => {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  currentTimeDisplay.textContent = `${minutes}:${seconds}`;
});

lyrics.forEach(line => {
  const div = document.createElement('div');
  div.classList.add('lyric-line');
  div.textContent = line.text;
  lyricsContainer.appendChild(div);
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶';
  }
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = audio.currentTime;
  progressBar.max = audio.duration;

  let activeIndex = -1;
  lyrics.forEach((line, index) => {
    if (audio.currentTime >= line.time) {
      activeIndex = index;
    }
  });

  document.querySelectorAll('.lyric-line').forEach((line, index) => {
    if (index === activeIndex) {
      line.classList.add('highlighted');
      line.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      line.classList.remove('highlighted');
    }
  });
});

progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

volumeIcon.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    volumeControl.value = audio.volume;
    volumeIcon.src = '../../assets/spotify-assets/icons/volume-up.png';
  } else {
    audio.muted = true;
    volumeControl.value = 0;
    volumeIcon.src = '../../assets/spotify-assets/icons/mute.png';
  }
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
  audio.muted = volumeControl.value === '0';
  volumeIcon.src = audio.muted ? '../../assets/spotify-assets/icons/mute.png' : '../../assets/spotify-assets/icons/volume-up.png';
});