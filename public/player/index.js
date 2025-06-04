import getXeno from '/api/xeno.js';

async function loadPlayer() {
  const xeno = await getXeno();
  console.log(xeno)

  return (`
    <h1>
      ${xeno.recordings[0].file}
    </h1>
  `);
}

window.onload = async () => {
  document.getElementById('player-con').innerHTML = '<h1>Loading...<h1>';
  document.getElementById('player-con').innerHTML = await loadPlayer();
}