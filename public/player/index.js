import getXeno from '/api/xeno.js';

function loadPlayer() {
  return (`
    <h1>
      ${getXeno()}
    </h1>
  `);
}

window.onload = () => {
  document.getElementById('player-con').innerHTML = loadPlayer();
}