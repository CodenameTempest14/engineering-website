const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById ('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const lyricsContainer = document.getElementById('lyrics-container');
const volumeIcon = document.getElementById('volumeIcon');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

const lyrics = [
  { time: 24, text: "Fly me to the moon and" },
  { time: 27, text: "Let me play among the stars" },
  { time: 33, text: "Let me see what spring is like" },
  { time: 37, text: "On, Jupiter and Mars" },
  { time: 41, text: "In other words, hold my hand" },
  { time: 50, text: "In other words, darling kiss me" },
  { time: 59, text: "Fill my heart with song" },
  { time: 62, text: "And let me sing, forevermore" },
  { time: 68, text: "You are all I long for" },
  { time: 71, text: "All I worship and adore" },
  { time: 76, text: "In other words, please be true" },
  { time: 85, text: "In other words, I love you" },
  { time: 94, text: "Hmmm-hmmm-hmmm" },
  { time: 103, text: "Hmmm-hmmm-hmmm" },
  { time: 110, text: "Hmmm-hmmm-hmmm-hmmm" },
  { time: 119, text: "Hmmm-hmmm-hmmm" },
  { time: 127, text: "Fill my heart with song" },
  { time: 130, text: "And let me sing, forevermore" },
  { time: 135, text: "You are all I long for" },
  { time: 139, text: "All I worship and adore" },
  { time: 143, text: "In other words, please be true" },
  { time: 150, text: "In another word, I love you" },
  { time: 158, text: "In another word, I love you" },
  { time: 168, text: "..." }
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