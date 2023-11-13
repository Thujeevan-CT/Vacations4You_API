const getRandomNumber = () => {
  const randomNumber = Math.random();
  const randomInteger = Math.floor(randomNumber * 5) + 1;
  
  return randomInteger;
}

module.exports = { getRandomNumber };