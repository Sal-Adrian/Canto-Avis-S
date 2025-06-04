import getXeno from '/api/xeno.js';

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
  document.getElementById('player-con').innerHTML = '<h1>Loading...<h1>';
  document.getElementById('player-con').innerHTML = await createPlayer();
}

document.getElementById('nextBtn').addEventListener('click', async (e) => {
  birds[0].nextBird();
  document.getElementById('player-con').innerHTML = loadPlayer(birds[0].getBird());
});


async function createPlayer() {
  const rec = await getXeno();
  birds.push(new Birds(rec.recordings));

  return loadPlayer(birds[0].getBird());
}

function loadPlayer(bird) {
  return (`
    <p>Name: ${bird.en}</p>
    <p>Location: ${bird.loc}</p>
    <p>Time: ${bird.time}</p>
    <p>Type of Call: ${bird.type}</p>
    <p>Specific Name: ${bird.gen} ${bird.sp}</p>
    <p>Recordist: ${bird.rec}</p>
  `);
}