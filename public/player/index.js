import { getXeno, downloadXeno } from '/api/xeno.js';

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
  document.getElementById('player-audio').appendChild(loadAudio(bird.file));
}

document.getElementById('nextBtn').addEventListener('click', async (e) => {
  birds[0].nextBird();
  const bird = birds[0].getBird();
  document.getElementById('player-details').innerHTML = loadDetails(bird);
  document.getElementById('player-audio').innerHTML = "";
  document.getElementById('player-audio').appendChild(loadAudio(bird.file));
});


async function createPlayer() {
  const rec = await getXeno();
  birds.push(new Birds(rec.recordings));
}

function loadAudio(URL) {
  const aud = document.createElement('audio');
  aud.src = URL;
  aud.controls = true;
  // aud.autoplay = true;

  return aud;
}

function loadDetails(bird) {
  return (`
    <p>Name: ${bird.en}</p>
    <p>Location: ${bird.loc}</p>
    <p>Time: ${bird.time}</p>
    <p>Type of Call: ${bird.type}</p>
    <p>Specific Name: ${bird.gen} ${bird.sp}</p>
    <p>Recordist: ${bird.rec}</p>
    <p>URL: ${bird.file}</p>
    <p>File Name: ${bird['file-name']}</p>
  `);
}