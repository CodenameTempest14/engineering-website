const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById ('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const lyricsContainer = document.getElementById('lyrics-container');
const volumeIcon = document.getElementById('volumeIcon');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

const lyrics = [
  { time: 17, text: "Oh, her eyes, her eyes" },
  { time: 19, text: "Make the stars look like they're not shining" },
  { time: 22, text: "Her hair, her hair" },
  { time: 24, text: "Falls perfectly without her trying" },
  { time: 26, text: "She's so beautiful" },
  { time: 29, text: "And I tell her every day" },
  { time: 34, text: "Yeah, I know, I know" },
  { time: 37, text: "When I compliment her, she won't believe me" },
  { time: 40, text: "And it's so, it's so" },
  { time: 42, text: "Sad to think that she don't see what I see" },
  { time: 44, text: "But every time she asks me, Do I look okay?" },
  { time: 48, text: "I say" },
  { time: 51, text: "When I see your face" },
  { time: 56, text: "There's not a thing that I would change" },
  { time: 60, text: "'Cause you're amazing" },
  { time: 64, text: "Just the way you are" },
  { time: 69, text: "And when you smile" },
  { time: 73, text: "The whole world stops and stares for a while" },
  { time: 78, text: "'Cause girl, you're amazing" },
  { time: 81, text: "Just the way you are" },
  { time: 85, text: "Yeah" },
  { time: 88, text: "Her lips, her lips" },
  { time: 90, text: "I could kiss them all day if she'd let me" },
  { time: 92, text: "Her laugh, her laugh" },
  { time: 94, text: "She hates, but I think it's so sexy" },
  { time: 97, text: "She's so beautiful" },
  { time: 99, text: "And I tell her every day" },
  { time: 105, text: "Oh, you know, you know, you know" },
  { time: 107, text: "I'd never ask you to change" },
  { time: 110, text: "If perfect's what you're searching for" },
  { time: 112, text: "Then just stay the same" },
  { time: 114, text: "So don't even bother asking if you look okay" },
  { time: 118, text: "You know I'll say" },
  { time: 121, text: "When I see your face" },
  { time: 126, text: "There's not a thing that I would change" },
  { time: 131, text: "'Cause you're amazing" },
  { time: 134, text: "Just the way you are" },
  { time: 140, text: "And when you smile" },
  { time: 144, text: "The whole world stops and stares for a while" },
  { time: 148, text: "'Cause girl, you're amazing" },
  { time: 152, text: "Just the way you are" },
  { time: 157, text: "The way you are" },
  { time: 161, text: "The way you are" },
  { time: 166, text: "Girl, you're amazing" },
  { time: 169, text: "Just the way you are" },
  { time: 174, text: "When I see your face" },
  { time: 179, text: "There's not a thing that I would change" },
  { time: 184, text: "'Cause you're amazing" },
  { time: 187, text: "Just the way you are" },
  { time: 192, text: "And when you smile" },
  { time: 197, text: "The whole world stops and stares for a while" },
  { time: 201, text: "'Cause girl, you're amazing" },
  { time: 204, text: "Just the way you are" },
  { time: 209, text: "Yeah" }
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