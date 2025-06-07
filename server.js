import getXeno from './api/xeno.js';
import XENO_KEY from './env.js';

import { readFile } from 'fs/promises';
import express from 'express';
const app = express();
const port = 8080;


app.use('/', express.static('public'));

app.get('/birds', async (req, res) => {
  try {
    // const xeno = await getXeno(XENO_KEY);
    const xeno = JSON.parse(await readFile("testData.json", "utf8")); 

    res.json(xeno.recordings)
  } catch(error) {
    res.status(400).send({message: 'Issue with API.'})
  }
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});