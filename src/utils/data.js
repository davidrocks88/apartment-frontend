import React from 'react';
const _ = require('lodash');

const basePrices = [1000, 1500, 2000, 2500, 1500]
const numPrices = 10;
const numApartmentPrices = 20;
const apartmentPriceFluctuationFactor = 1 / 10;
const factorPerBedroom = 1 / 8;

function randomNumber(min, max) {  
  return Math.floor(Math.random() * (max - min) + min); 
}  

export function addPrices(communities) {
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

export function addApartmentPriceHistory(apartments, communities) {
  apartments.forEach((apartment => {
    const community = communities.find(c=>c.community_id === apartment.community_id);
    const price = _.mean(community.averagePrices);

    const apartmentPrices = [];
    const shift = randomNumber(0, 6);

    for (let i = 0; i < numApartmentPrices; i++) {
      const sinusoidalPrice = price + (price * apartmentPriceFluctuationFactor) * Math.sin(shift + 2 * Math.PI * (i % 7) / 7);
      const withSalt = sinusoidalPrice + randomNumber(-20, 20) + (sinusoidalPrice * factorPerBedroom * apartment.beds);
      const finalPrice = Math.round(withSalt / 10) * 10;
      const d = new Date();
      d.setDate(d.getDate() - i);
      apartmentPrices.push({price: finalPrice, date: d.toString()});
    }

    apartment.prices = apartmentPrices;
    apartment.communityName = community.name;
  }))

  return apartments;
}

export function getBedroomString(beds) {
  switch (beds) {
    case 0:
      return "Studio";
    case 1:
      return "1 Bedroom";
    default:
      return beds + " Bedrooms";
  }
}

export function getBathroomString(baths) {
  switch (baths) {
    case 0:
      return "No Bathroom";
    case 1:
      return "1 Bathroom";
    default:
      return baths + " Bathrooms";
  }
}

export function getSqftString(sqft) {
  return (<div style={{display: "inline"}}>{sqft} ft<sup>2</sup></div>);
}