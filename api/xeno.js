export default async function getXeno(XENO_KEY) {
  try {
    const response = await fetch(`https://xeno-canto.org/api/3/recordings?query=grp:%22birds%22%20q:%22A%22&key=${XENO_KEY}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}