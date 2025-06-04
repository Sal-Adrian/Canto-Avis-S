const XENO_KEY = 'fff9b903d5fad8d74070e131eba68995955e3aa6'//process.env.XENO_KEY;

export default async function getXeno() {
  try {
    const response = await fetch(`https://xeno-canto.org/api/3/recordings?query=sp:%22larus%20fuscus%22&per_page=50&key=${XENO_KEY}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}