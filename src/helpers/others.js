const multiplyByTens = (number) => {
  let multipliedNumber = 1
  for (let i=0; i<number; i++) {
    multipliedNumber =  multipliedNumber  * 10
  }
  return multipliedNumber
}

const genrateRandomNumber = (number) => {
  const tensMultiplier = multiplyByTens(number)
  return Math.floor(100000 + Math.random() * 9 * tensMultiplier)
}

module.exports = {
  genrateRandomNumber
}