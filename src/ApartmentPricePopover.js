import { Box, Typography } from "@material-ui/core";
import React from "react";
import {
  getBedroomString,
  getBathroomString,
  getSqftString,
} from "./utils/data";
import { useSelector } from "react-redux";
import { getSelectedApartmentUnit, getCommunityById } from "./redux/selectors";
import {getColorFromPercentage} from './utils/data';
import CanvasJSReact from "./utils/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const _ = require("lodash");

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function mode(arr){
  return arr.sort((a,b) =>
        arr.filter(v => v===a).length
      - arr.filter(v => v===b).length
  ).pop();
}

export default function ApartmentPricePopover() {
  const apartment = useSelector(getSelectedApartmentUnit);
  const community = useSelector(getCommunityById(apartment.communityID));
  const preDates = [...apartment.prices].map(d => {return {...d, date: new Date(d.date)}});

  const prices = [...preDates].sort((a, b) => b - a);
  const averagePrice = _.mean(prices.map((p) => p.price));
  const height = "400";
  const options = {
    height,
    animationEnabled: true,
    axisX: {
      tickLength: 0,
      valueFormatString: "MMMM DD"
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      tickLength: 0,
      labelFormatter: (e) => `$${e.value.toLocaleString("en-us")}`,
    },
    data: [
      {
        type: "spline",
        dataPoints: prices.map((p) => {
          return { y: p.price, x: p.date };
        }),
      }
    ],
  };

  // Only show average if there is enough data
  const minDataRequiredForAverage = 5;
  if (options.data[0].dataPoints.length >= minDataRequiredForAverage) {
    options.data.push({
      type: "line",
      lineDashType: "dot",
      markerSize: 0,
      color: "black",
      dataPoints: [
        { y: averagePrice, x: prices[0].date },
        { y: averagePrice, x: prices[prices.length - 1].date, indexLabel: `$${averagePrice.toLocaleString('en-us')}` },
      ],
    })
  }

  // Make last point red
  const lastPoint = options.data[0].dataPoints[0];
  lastPoint.color = getColorFromPercentage(lastPoint.y - averagePrice) ;
  lastPoint.markerSize = 20;
  lastPoint.indexLabel = `$${lastPoint.y.toLocaleString("en-us")}`;

  // Label local minima (lowest 5)
  const sortedPrices = options.data[0].dataPoints
    .map((d, index) => {
      return { price: d.y, date: d.x, index };
    })
    .sort((a, b) => a.price - b.price);
  sortedPrices.slice(0, 4).forEach((p) => {
    const pt = options.data[0].dataPoints[p.index];
    pt.color = "green";
    pt.markerType = "cross";
    pt.indexLabel = `${weekday[p.date.getDay()]}`;
    pt.indexLabelBackgroundColor = "green";
    pt.indexLabelFontColor = "white";
  });



  const bestDay = weekday[mode(sortedPrices.slice(0,4).map(p=>p.date.getDay()))];

  const difference =
    Math.round(((apartment.currentPrice - averagePrice) * 1000) / averagePrice) / 10;

  const advice = `${difference > 0 ? "Don't buy" : "Buy"}, currently ${new Intl.NumberFormat('en-us', { maximumSignificantDigits: 3 }).format(Math.abs(
    difference)
  )}% ${difference > 0 ? "above" : "under"} average`;
  return (
    <Box p={2} style={{ width: "40em", height }}>
      <Typography variant="h5">
        {community.name.toUpperCase()} -{" "}
        {apartment.apartmentNumber.toUpperCase()}
      </Typography>
      <Typography variant="h6">
        {getBedroomString(apartment.beds)}, {getBathroomString(apartment.baths)}{" "}
        - {getSqftString(apartment.size)}
      </Typography>
      <CanvasJSChart options={options} />
      <Typography variant="subtitle1">
        Current Price: <b>${lastPoint.y.toLocaleString("en-us")}</b>
      </Typography>
      <Typography variant="subtitle2">
        <b>Advice: </b>
        {advice}
        <br />
        Best day to lease: <b>{bestDay}</b>
      </Typography>
    </Box>
  );
}
