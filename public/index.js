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
    document.getElementById('loopIcon').style = 'background-color:green';
  } else {
    document.getElementById('loopIcon').style = 'background-color:red';
  }
});

document.getElementById('queueBtn').addEventListener('click', async(e) => {
  const queue = document.getElementById('player-con');
  let newName = queue.className;
  if(newName.indexOf('open') > -1) {
    newName = newName.replace('open', 'close');
  } else {
    newName = newName.replace('close', 'open');
  }
  queue.className = newName;

  for(let i = 1; i < 11; i++) {
    const queueItem = document.getElementById("Q"+i);
    queueItem.className = queueItem.className ? "" : "hide";
  }
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
    <p>Name: ${bird.en}</p>
    <p>Location: ${bird.loc}</p>
    <p>Length: ${bird.length}</p>
    <p>Type of Call: ${bird.type}</p>
    <p>Specific Name: ${bird.gen} ${bird.sp}</p>
    <p>Recordist: ${bird.rec}</p>
    <p>URL: ${bird.file}</p>
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