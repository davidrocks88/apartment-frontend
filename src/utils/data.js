import React from "react";
const _ = require("lodash");

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
  return (
    <div style={{ display: "inline" }}>
      {sqft} ft<sup>2</sup>
    </div>
  );
}

export function analyzeApartmentPrices(apartment) {
  const avg = _.mean(apartment.prices.map((p) => p.price));
  return ((apartment.currentPrice - avg) / avg).toPrecision(2);
}

export function getColorFromPercentage(p) {
  p = Number(p);
  if (p > 0) {
    return "red";
  } else if (p === 0) {
    return "grey";
  } else {
    return "green";
  }
}

export function getIconFromPercentage(p) {
  p = Number(p);
  if (p > 0) {
    return "▲";
  } else if (p === 0) {
    return "↔";
  } else {
    return "▼";
  }
}

export function getAveragePriceOfApartments(apartments) {
  if (apartments.length === 0) return [];
  try {
    const pricesArr = apartments.map((a) => a.prices);
    const retArray = Array(pricesArr[0].length);

    for (let i = 0; i < retArray.length; i++) {
      const values = pricesArr.map((p) => p[i].price);
      retArray[i] = { price: Math.round(_.mean(values)), date: pricesArr[0][i].date };
    }

    return retArray;
  } catch (e) {
    console.log(e);
    return [];
  }
}
