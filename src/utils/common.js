export const getRandomHexColor = () => {
  // Credit: https://www.paulirish.com/2009/random-hex-color-code-snippets/
  return '#'+Math.floor(Math.random()*16777215).toString(16);
};