const birds = [];

class Birds {
  constructor(recordings) {
    this.data = recordings;
    this.currIndex = 0;
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
}


window.onload = async () => {
  await createPlayer();
}

document.getElementById('nextBtn').addEventListener('click', async (e) => {
  playNextBird();
});
document.getElementById('audio-player').addEventListener('ended', (e) => {
  playNextBird();
})

document.getElementById('loopBtn').addEventListener('click', async (e) => {
  const aud = document.getElementById('audio-player');
  aud.loop = !aud.loop;
  
  if(aud.loop) {
    document.getElementById('loopBtn').src = "images/loop-on.svg"
  } else {
    document.getElementById('loopBtn').src = "images/loop-off.svg"
  }
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
  
  // COMMENTED OUT WHILE TESTING
  // document.getElementById('audio-player').src = bird.file;
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
  birds[0].nextBird();
  const bird = birds[0].getBird();

  document.getElementById('player-details').innerHTML = createDetails(bird);
  // COMMENTED OUT WHILE TESTING
  // document.getElementById('audio-player').src = bird.file;
}