

function loadPlayer() {
  return (`
    <h1>
      blah blah
    </h1>
  `);
}

window.onload = () => {
  document.getElementById('player-con').innerHTML = loadPlayer();
}