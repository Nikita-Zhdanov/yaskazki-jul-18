const musicContainer = document.querySelector('.player__container');
const playBtn = document.querySelector('.player__play-ic-container');
const audio = document.getElementById('audio');
const title = document.querySelector('.player__play-title .super-small');
const artist = document.querySelector('.player__play-artist .super-small');
const test = document.querySelector('.img-block__navlink-container');
const playerWrapper = document.querySelector('.player__wrapper');

// Song titles
const songs = ['01-tatary', '02-karely', '03-avarcy', '04-kalmyki', '05-altaytsy', '06-yakuty', '07-russkie', '08-udmurty', '09-cherkesy', '10-chuvashy', '11-evenky', '12-chechentsy', '13-nanaytsy', '14-komi', '15-nentsy'];
const artists = ['Juna', 'ILMU', 'Хиринду Султанова', 'Somerset', 'Bayaru Takshina', 'Ayarkhaan', 'Синекдоха Монток', 'Ladi Sveti', 'Jrpjej', 'Ялар', 'Синильга', 'Хава Хамзатова', 'Нина Гейкер', 'Надежда Мусатова', 'Минлей']
const name = ['Татарская колыбельная', 'Карельская колыбельная', 'Аварская колыбельная', 'Калмыцкая колыбельная', 'Алтайская колыбельная', 'Якутская колыбельная', 'Русская колыбельная', 'Удмуртская колыбельная', 'Черкесская колыбельная', 'Чувашская колыбельная', 'Эвенкийская колыбельная', 'Чеченская колыбельная', 'Нанайская колыбельная', 'Коми колыбельная', 'Ненецкая колыбельная']
// Keep track of song
let songIndex;
let songAttribute = playerWrapper.getAttribute('data-song-index');
songIndex = songAttribute;
// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = name[songIndex];
    artist.innerText = artists[songIndex];
  audio.src = `music/${song}.mp3`;
}
// Play song
function playSong() {
  musicContainer.classList.add('play');
  document.querySelector(".player__play-ic").style.display = "none";
  document.querySelector(".player__pause-ic").style.display = "block";

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  document.querySelector(".player__play-ic").style.display = "block";
  document.querySelector(".player__pause-ic").style.display = "none";

  audio.pause();
}


// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});



// Song ends
audio.loop = true;
