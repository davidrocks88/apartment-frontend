import { Box, Typography } from "@material-ui/core";
import React from "react";
import { getBedroomString, getBathroomString, getSqftString } from './utils/data'
import { useSelector } from 'react-redux';
import { getSelectedApartmentUnit } from './redux/selectors';
import CanvasJSReact from "./utils/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const _ = require('lodash');

export default function ApartmentPricePopover() {
  const apartment = useSelector(getSelectedApartmentUnit);

  const prices = [...apartment.prices].sort((a,b)=> b - a);
  const averagePrice = _.mean(prices.map(p=>p.price));
  console.log(averagePrice)
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
      labelFormatter: (e) => `$${e.value.toLocaleString('en-us')}`,
    },
    data: [
      {
        type: "spline",
        dataPoints: prices.map((p) => {
          return { y: p.price, x: p.date };
        }),
      },
      {
        type: "line",
        lineDashType: "dot",
        markerSize: 0,
        color: 'black',
        dataPoints: [
          {y: averagePrice, x: prices[0].date},
          {y: averagePrice, x: prices[prices.length - 1].date}
        ]
      }
    ],
  };

  // Make last point red
  const lastPoint = options.data[0].dataPoints[0];
  lastPoint.color = lastPoint.y > averagePrice ? "green" : "red";
  lastPoint.markerSize = 20;
  lastPoint.indexLabel = `$${lastPoint.y.toLocaleString('en-us')}`

  const currentPrice = lastPoint.y;
  const difference = Math.round((currentPrice - averagePrice) * 1000 / averagePrice) / 10;
  const advice = `${difference > 0 ? "Don't buy" : "Buy"}, currently ${Math.abs(difference)}% ${difference > 0 ? "above" : "under"} average`;
  return (
    <Box p={2} style={{width: '40em', height}}>
      <Typography variant="h5">{apartment.communityName.toUpperCase()} - {apartment.apartmentNumber.toUpperCase()}</Typography>
      <Typography variant="h6">{getBedroomString(apartment.beds)}, {getBathroomString(apartment.baths)} - {getSqftString(apartment.size)}</Typography>
      <CanvasJSChart
        options={options}
      />
      <Typography variant="subtitle1">Current Price: <b>${lastPoint.y.toLocaleString('en-us')}</b></Typography>
      <Typography variant="subtitle2"><b>Advice: </b>{advice}</Typography>
    </Box>
  );
}
