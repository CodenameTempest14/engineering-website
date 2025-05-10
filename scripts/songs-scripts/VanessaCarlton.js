const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById ('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const lyricsContainer = document.getElementById('lyrics-container');
const volumeIcon = document.getElementById('volumeIcon');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

const lyrics = [
  { time: 11, text: "Makin' my way downtown" },
  { time: 12, text: "Walkin' fast" },
  { time: 13, text: "Faces pass and I'm homebound" },
  { time: 20, text: "Starin' blankly ahead" },
  { time: 22, text: "Just makin' my way" },
  { time: 23, text: "Makin' my way" },
  { time: 24, text: "Through the crowd" },
  { time: 32, text: "And I need you" },
  { time: 34, text: "And I miss you" },
  { time: 37, text: "And now I wonder" },
  { time: 41, text: "If I could fall" },
  { time: 43, text: "Into the sky" },
  { time: 45, text: "Do you think time" },
  { time: 48, text: "Would pass me by" },
  { time: 50, text: "Cause you know" },
  { time: 52, text: "I'd walk a thousand miles" },
  { time: 55, text: "If I could just see you tonight" },
  { time: 66, text: "Its always times like these" },
  { time: 67, text: "When I think of you" },
  { time: 69, text: "And wonder if you ever think of me" },
  { time: 76, text: "Cause everything's so wrong" },
  { time: 78, text: "And I dont belong" },
  { time: 79, text: "Living in your precious memory" },
  { time: 87, text: "Cause I need you" },
  { time: 90, text: "And I miss you" },
  { time: 93, text: "And now I wonder" },
  { time: 96, text: "If I could fall" },
  { time: 99, text: "Into the sky" },
  { time: 101, text: "Do you think time" },
  { time: 103, text: "Would pass me by" },
  { time: 106, text: "Cause you know" },
  { time: 108, text: "I'd walk a thousand miles" },
  { time: 111, text: "If I could just see you tonight" },
  { time: 126, text: "And I...I...Dont wan't to let you know" },
  { time: 132, text: "I...I...Drown in your memory" },
  { time: 137, text: "I...I...Dont want to let this go" },
  { time: 141, text: "I...I...Don't" },
  { time: 147, text: "Makin my way downtown" },
  { time: 149, text: "Walkin' fast" },
  { time: 150, text: "Faces pass and I'm homebound" },
  { time: 157, text: "Staring blankly ahead" },
  { time: 159, text: "Just makin' my way" },
  { time: 160, text: "Makin' a way" },
  { time: 161, text: "Through the crowd" },
  { time: 168, text: "And I still need you" },
  { time: 171, text: "And I still miss you" },
  { time: 174, text: "And now I wonder" },
  { time: 178, text: "If I could fall" },
  { time: 180, text: "Into the sky" },
  { time: 183, text: "Do you think time" },
  { time: 186, text: "Would pass us by" },
  { time: 188, text: "Cause you know" },
  { time: 190, text: "I'd walk a thousand miles" },
  { time: 192, text: "If I could just see you" },
  { time: 199, text: "If I could fall" },
  { time: 201, text: "Into the sky" },
  { time: 203, text: "Do you think time" },
  { time: 206, text: "Would pass me by" },
  { time: 208, text: "Cause you know" },
  { time: 210, text: "I'd walk a thousand miles" },
  { time: 213, text: "If I could just see you" },
  { time: 218, text: "If I could just hold you" },
  { time: 224, text: "Tonight" }
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