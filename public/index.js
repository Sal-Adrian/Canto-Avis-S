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
    this.currIndex += 1;
  }
}


window.onload = async () => {
  document.getElementById('player-details').innerHTML = '<h1>Loading...<h1>';
  await createPlayer();

  const bird = birds[0].getBird();
  document.getElementById('player-details').innerHTML = loadDetails(bird);
  document.getElementById('audio-con').appendChild(loadAudio(bird.file, false));
}

document.getElementById('nextBtn').addEventListener('click', async (e) => {
  birds[0].nextBird();
  const bird = birds[0].getBird();
  const looping = document.getElementById('player-audio').loop;

  document.getElementById('player-details').innerHTML = loadDetails(bird);
  document.getElementById('audio-con').innerHTML = "";
  document.getElementById('audio-con').appendChild(loadAudio(bird.file, looping));
});

document.getElementById('loopBtn').addEventListener('click', async (e) => {
  const aud = document.getElementById('player-audio');
  aud.loop = !aud.loop;
  
  if(aud.loop) {
    document.getElementById('loopIcon').style = 'background-color:green';
  } else {
    document.getElementById('loopIcon').style = 'background-color:red';
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
}

function loadAudio(URL, looping) {
  const aud = document.createElement('audio');

  aud.src = URL;
  aud.controls = true;
  aud.id = "player-audio";
  aud.loop = looping;
  // aud.autoplay = true;

  return aud;
}

function loadDetails(bird) {
  return (`
    <p>Name: ${bird.en}</p>
    <p>Location: ${bird.loc}</p>
    <p>Length: ${bird.length}</p>
    <p>Type of Call: ${bird.type}</p>
    <p>Specific Name: ${bird.gen} ${bird.sp}</p>
    <p>Recordist: ${bird.rec}</p>
    <p>URL: ${bird.file}</p>
    <p>File Name: ${bird['file-name']}</p>
  `);
}