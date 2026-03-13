// Pausing or playing  a song on the music player 
const playBtn = document.getElementById("play");
const audio = document.getElementById("audio-player");

let isPlaying = false;

playBtn.addEventListener("click",() => {

  if(isPlaying){
    audio.pause();
    playBtn.textContent = "▶";

  }else{

    audio.play();
    playBtn.textContent = "⏸";

  }

  isPlaying = !isPlaying;

});

// song card playing a song
const songCards = document.querySelectorAll(".song-card");

songCards.forEach(card => {

  card.addEventListener("click", () => {

  const song = card.getAttribute("data-song");

  audio.src = song;

  audio.play();

  playBtn.textContent = "⏸";

  isPlaying = true;

});

});

// Updating current time and duration on the music player
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

audio.addEventListener("timeupdate", () => {

  progress.value = (audio.currentTime / audio.duration) * 100;

  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime % 60);

  if(currentSeconds < 10){
    currentSeconds = "0" + currentSeconds;
  }

  currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;

  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);

  if(durationSeconds < 10){
    durationSeconds = "0" + durationSeconds;
  }

  durationEl.textContent = durationMinutes + ":" + durationSeconds;

});

audio.addEventListener("loadedmetadata", () => {

  const durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);
  if(durationSeconds < 10)
  { durationSeconds = "0" + durationSeconds; }
  durationEl.textContent = durationMinutes + ":" + durationSeconds;
});

progress.addEventListener("input", () => {

  const duration = audio.duration;

  audio.currentTime = (progress.value / 100) * duration;
});

// Updating artist name, song title and song cover on the music player
document.addEventListener("DOMContentLoaded", () => {

  const playerTitle = document.getElementById("player-title");
  const playerArtist = document.getElementById("player-artist");
  const songCards = document.querySelectorAll(".song-card");
  const audio = document.getElementById("audio-player"); 
  const currentTimeEl = document.getElementById("current-time");
  const progress = document.getElementById("progress"); 

  songCards.forEach(card => {
    card.addEventListener("click",() =>{

      const title = card.dataset.title;
      const artist = card.dataset.artist;
      const src = card.dataset.src;
      const cover = card.dataset.cover;

      audio.src = src;
      audio.play();

      playerTitle.textContent = title;
      playerArtist.textContent = artist;
      document.querySelector(".player-left img").src = cover;

      progress.value = 0;
      currentTimeEl.textContent = "0:00";

    });
  });
});

// Start listening button
const StartBtn = document.getElementById("start-listening");

const featuredSongs = document.getElementById("songs-section");

StartBtn.addEventListener("click", () => {
  featuredSongs.scrollIntoView({ behavior: "smooth" });
});

// Highlight the first card when scrolled
StartBtn.addEventListener("click", () => {
  featuredSongs.scrollIntoView({ behavior:"smooth" });

  const firstSong = featuredSongs.querySelector(".song-card");
  if(firstSong){
    firstSong.classList.add("highlight");
    setTimeout(() =>
    firstSong.classList.remove("highlight"), 1500);
  }
});

