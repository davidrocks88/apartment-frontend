const basePrices = [1000, 1500, 2000, 2500, 1500]
const numPrices = 10;

function randomNumber(min, max) {  
  return Math.floor(Math.random() * (max - min) + min); 
}  

export default function addPrices(communities) {
  communities.forEach((c => {
    const avgPrice = basePrices[randomNumber(0, basePrices.length - 1)];
    const prices = [];
    for (let i = 0; i < numPrices; i++) {
      prices.push(avgPrice + randomNumber(-1 * avgPrice / 10, avgPrice / 10));
    }
    c.averagePrices = prices;
  }))

  return communities;
}