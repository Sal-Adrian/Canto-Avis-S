export default async function getXeno(XENO_KEY) {
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