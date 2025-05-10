const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById ('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const lyricsContainer = document.getElementById('lyrics-container');
const volumeIcon = document.getElementById('volumeIcon');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

const lyrics = [
  { time: 7, text: "When I was six years old I broke my leg" },
  { time: 15, text: "I was running from my brother and his friends" },
  { time: 21, text: "And tasted the sweet perfume of the mountain grass I rolled down" },
  { time: 29, text: "I was younger then" },
  { time: 32, text: "Take me back to when" },
  { time: 35, text: "I found my heart and broke it here" },
  { time: 39, text: "Made friends and lost them through the years" },
  { time: 43, text: "And I've not seen the roaring fields in so long" },
  { time: 48, text: "I know I've grown" },
  { time: 50, text: "But I can't wait to go home" },
  { time: 53, text: "I'm on my way" },
  { time: 57, text: "Driving at 90 down those country lanes" },
  { time: 64, text: "Singing to 'Tiny Dancer'" },
  { time: 67, text: "And I miss the way" },
  { time: 70, text: "You make me feel" },
  { time: 73, text: "And it's real" },
  { time: 74, text: "When we watched the sunset over the castle on the hill" },
  { time: 85, text: "Fifteen years old and smoking hand-rolled cigarettes" },
  { time: 93, text: "Running from the lawn through the backfields and" },
  { time: 96, text: "Getting drunk with my friends" },
  { time: 100, text: "Had my first kiss on a Friday night" },
  { time: 104, text: "I don't reckon that I did it right" },
  { time: 107, text: "I was younger then" },
  { time: 110, text: "Take me back to when" },
  { time: 112, text: "We found weekend jobs, when we got paid" },
  { time: 117, text: "We'd buy cheap spirits and drink them straight" },
  { time: 121, text: "Me and my friends have not thrown up in so long" },
  { time: 126, text: "Oh, how we've grown" },
  { time: 129, text: "But I can't wait to go home" },
  { time: 131, text: "I'm on my way" },
  { time: 135, text: "Driving at 90 down those country lanes" },
  { time: 142, text: "Singing to 'Tiny Dancer'" },
  { time: 145, text: "And I miss the way" },
  { time: 148, text: "You make me feel" },
  { time: 151, text: "And it's real" },
  { time: 153, text: "When we watched the sunset over the castle on the hill" },
  { time: 163, text: "Over the castle on the hill" },
  { time: 170, text: "Over the castle on the hill" },
  { time: 174, text: "..." },
  { time: 178, text: "..." },
  { time: 181, text: "One friend left to sell clothes" },
  { time: 185, text: "One works down by the coast" },
  { time: 189, text: "One had two kids but lives alone" },
  { time: 193, text: "One's brother overdosed" },
  { time: 196, text: "One's already on his second wife" },
  { time: 200, text: "One's just barely getting by" },
  { time: 202, text: "But these people raised me" },
  { time: 205, text: "And I can't wait to go home" },
  { time: 209, text: "And I'm on my way" },
  { time: 213, text: "I still remember these old country lanes" },
  { time: 219, text: "When we did not know the answers" },
  { time: 224, text: "And I miss the way" },
  { time: 226, text: "You make me feel" },
  { time: 230, text: "And it's real" },
  { time: 231, text: "When we watched the sunset" },
  { time: 234, text: "Over the castle on the hill" },
  { time: 241, text: "Over the castle on the hill" },
  { time: 248, text: "Over the castle on the hill" },
  { time: 252, text: "..." }
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