const birds = [];

class Birds {
  constructor(recordings) {
    this.data = recordings;
    this.currIndex = 0;
    this.endInSeconds = timeToSec(this.data[0].length);
  }
  getCurrIndex() {
    return this.currIndex;
  }
  getBird() {
    return this.data[this.currIndex]
  }
  nextBird() {
    const plusOne = this.currIndex + 1;
    this.currIndex = plusOne < this.data.length ? plusOne : 0;
    updateQueue();
  }
  ithNextBird(i) {
    let plusI = this.currIndex + i;
    if(plusI >= this.data.length) plusI -= this.data.length;

    return this.data[plusI];
  }
  getCount() {
    return this.data.length;
  }
}
function timeToSec(time) {
  let sec = 60*time.substring(0, time.indexOf(':'));
  sec += parseInt(time.substring(time.indexOf(':')+1));
  return sec;
}


window.onload = async () => {
  await createPlayer();

  setInterval(() => {
    const currIndex = birds[0].getCurrIndex() + 1;
    const aud = document.getElementById('audio-player'+currIndex);
    if(aud.currentTime > birds[0].endInSeconds - 2) {
      linearDecrease(aud);}
  }, 1000);
}

document.getElementById('nextBtn').addEventListener('click', async (e) => {
  playNextBird();
});

document.getElementById('loopBtn').addEventListener('click', async (e) => {
  toggleLoop();
});

document.getElementById('queueBtn').addEventListener('click', async(e) => {
  const queue = document.getElementById('grid-con');
  let newName = queue.className;
  if(newName.indexOf('open') > -1) {
    document.getElementById('player-con').className = "center";
    newName = newName.replace('open', 'close');

    for(let i = 1; i < 11; i++) {
      document.getElementById("Q"+i).className = "hide";
    }
  } else {
    document.getElementById('player-con').className = "";
    newName = newName.replace('close', 'open');

    for(let i = 1; i < 11; i++) {
      if(i % 2 == 0) {
        document.getElementById("Q"+i).className = "";
      } else {
        document.getElementById("Q"+i).className = "dark-queue";
      }
    }
  }
  
  queue.className = newName;
});


async function createPlayer() {
  const res = await fetch(`http://localhost:8080/birds`);
  if(!res.ok) {
    document.getElementById('player-details').innerHTML = 'Error with API; Please refresh page to try again.';
    throw new Error("HTTP status " + res.status);
  }
  
  const rec = await res.json();
  birds.push(new Birds(rec));

  const bird = birds[0].getBird();
  document.getElementById('player-details').innerHTML = createDetails(bird);

  updateQueue();
  
  const audioContainer = document.getElementById('audio-players');
  for(let i = birds[0].getCount(); i > 0 ; i--) {
    const audioPlayer = document.createElement('audio');
    audioPlayer.id = "audio-player"+i;
    audioPlayer.className = "middle";
    audioContainer.prepend(audioPlayer);
    audioPlayer.addEventListener('ended', () => playNextBird());
  }
  for(let i = 1; i < birds[0].getCount()+1; i++) {
    const audioPlayer = document.getElementById('audio-player'+i);
    
    // COMMENTED OUT WHILE TESTING
    audioPlayer.addEventListener('play', () => {
      if(!document.getElementById('audio-player'+(i+1)).src)
        document.getElementById('audio-player'+(i+1)).src = birds[0].ithNextBird(1).file;
    });
    
    // ONLY USE FOR TESTING
    // const audioData = birds[0].data[i-1];
    // let fileName = 'testAudio/'
    // fileName += `XC${audioData.id} - `;
    // fileName += `${audioData.en} - `;
    // fileName += `${audioData.gen} ${audioData.sp}`;
    // if(audioData.ssp) fileName += ` ${audioData.ssp}`;
    // fileName += audioData['file-name'].slice(-4).toLowerCase();
    // audioPlayer.src = fileName;      
  }
  document.getElementById('audio-player1').src = bird.file;
  document.getElementById('audio-player1').controls = true;
}

function createDetails(bird) {
  return (`
    <p class="detail">Name: ${bird.en}</p>
    <p class="detail">Location: ${bird.loc}</p>
    <p class="detail">Length: ${bird.length}</p>
    <p class="detail">Type of Call: ${bird.type}</p>
    <p class="detail">Specific Name: ${bird.gen} ${bird.sp}</p>
    <p class="detail">Recordist: ${bird.rec}</p>
    <p class="detail">URL: ${bird.file}</p>
  `);
}

function updateQueue() {
  for(let i = 1; i < 11; i++) {
    const queueItem = document.getElementById("Q"+i);
    queueItem.innerHTML = birds[0].ithNextBird(i).en;
  }
}

function playNextBird(e) {
  let currIndex = birds[0].getCurrIndex() + 1;
  const oldBird = document.getElementById('audio-player'+currIndex);
  oldBird.pause();
  oldBird.controls = false;
  oldBird.currentTime = 0;
  if(oldBird.loop) toggleLoop();
  
  birds[0].nextBird();
  const bird = birds[0].getBird();
  document.getElementById('player-details').innerHTML = createDetails(bird);

  currIndex = birds[0].getCurrIndex() + 1;
  const newBird = document.getElementById('audio-player'+currIndex);
  if(!newBird.src) newBird.src = bird.file;
  newBird.play();
  newBird.controls = true;
  newBird.volume = 0;
  linearIncrease(newBird);
  birds[0].endInSeconds = timeToSec(birds[0].getBird().length);
}

function toggleLoop() {
  const currIndex = birds[0].getCurrIndex() + 1;
  const aud = document.getElementById('audio-player'+currIndex);
  aud.loop = !aud.loop;
  
  if(aud.loop) {
    document.getElementById('loopBtn').src = "images/loop-on.svg"
  } else {
    document.getElementById('loopBtn').src = "images/loop-off.svg"
  }
}

function linearDecrease(aud) {
  let i = 100*aud.volume;
  const intervalId = setInterval(() => {
    if(i < 0) {
      clearInterval(intervalId);
      return;
    }
    aud.volume = 0.01*i;
    i--;
  }, 10);
}
function linearIncrease(aud) {
  let i = 100*aud.volume;
  const intervalId = setInterval(() => {
    if(i > 100) {
      clearInterval(intervalId);
      return;
    }
    aud.volume = 0.01*i;
    i++;
  }, 10);
}