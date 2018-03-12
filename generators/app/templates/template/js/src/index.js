/**
 * Return a hello world message
 *
 * @param {string} hello - Howdy
 * @param {string} world - Texas
 * @returns {string} Hello, Texas!
 */
function helloWorld(hello = 'Howdy', world = 'Texas') {
  return `${hello}, ${world}!`;
}

export default helloWorld;
