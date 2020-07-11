import { Box, Typography } from "@material-ui/core";
import React from "react";
import { getBedroomString, getBathroomString, getSqftString } from './utils/data'
import { useSelector } from 'react-redux';
import { getSelectedApartmentUnit } from './redux/selectors';
import CanvasJSReact from "./utils/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ApartmentPricePopover() {
  const apartment = useSelector(getSelectedApartmentUnit);

  const prices = [...apartment.prices].sort((a,b)=> b - a);

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
    ],
  };

  // Make last point red
  const lastPoint = options.data[0].dataPoints[0];
  lastPoint.color = "red";

  const currentPrice = lastPoint.y;
  const averagePrice = prices.reduce((prev, next) => prev.price + next.price) / prices.length;
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
