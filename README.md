
# Canto Avis
Canto Avis is a music player for bird sounds using [Xeno-Canto](https://xeno-canto.org/explore/api)'s API. I enjoy the recordings on Xeno-Canto, but there isn't an option to consecutively play the recording in the background, so I made this.

## Static Version:
This version relies on API calls, meaning the performance is dependent on Xeno-Canto's servers and you will need an API key. For more consistant performace and no required setup, there is a [static version](https://sal-adrian.github.io/Canto-Avis/) of this project that uses files that were downloaded from Xeno-Canto. The downside of the static version is that you can't make custom API calls.
## Run Locally

**Download Express.js:**

```bash
npm install express
```

**Append API key to query:**  

You will first need to register an account on Xeno-Canto in order to get a personal API key. [More Information](https://xeno-canto.org/explore/api).

Line 3 of ```api/xeno.js``` contains the API query. Replace ```${XENO_KEY}``` with your API key, and customize the query if you'd like.

```const response = await fetch(`https://xeno-canto.org/api/3/recordings?query=grp:%22birds%22%20q:%22A%22&key=${XENO_KEY}`);```

**Run locally with Node:**

```bash
  node ./server.js
```