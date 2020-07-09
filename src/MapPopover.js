import { Box, Typography } from "@material-ui/core";
import React from "react";

import CanvasJSReact from "./utils/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function MapPopover({ community }) {
  const height = "200";
  const options = {
    height,
    animationEnabled: true,
    axisX: {
      tickLength: 0,
      labelFormatter: (e) => "",
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      tickLength: 0,
      labelFormatter: (e) => `$${e.value.toLocaleString('en-us')}`,
      maximum: community.averagePrices.reduce((prev, curr) => Math.max(prev, curr)) + 100,
      minimum: community.averagePrices.reduce((prev, curr) => Math.min(prev, curr)) - 100,
    },
    data: [
      {
        type: "line",
        dataPoints: community.averagePrices.map((p) => {
          return { y: p };
        }),
      },
    ],
  };

  // Make last point red
  const lastPoint = options.data[0].dataPoints[options.data[0].dataPoints.length - 1];
  lastPoint.color = "red";

  const currentPrice = lastPoint.y;
  const averagePrice = community.averagePrices.reduce((prev, next) => prev + next) / community.averagePrices.length;
  const difference = Math.round((currentPrice - averagePrice) * 1000 / averagePrice) / 10;
  const advice = `${difference > 0 ? "Don't buy" : "Buy"}, currently ${Math.abs(difference)}% ${difference > 0 ? "above" : "under"} average`;
  return (
    <Box p={2} style={{width: '20em', height}}>
      <Typography variant="h6">{community.name.toUpperCase()}</Typography>
      <CanvasJSChart
        options={options}
      />
      <Typography variant="subtitle1">Current Price: <b>${lastPoint.y.toLocaleString('en-us')}</b></Typography>
      <Typography variant="subtitle2"><b>Advice: </b>{advice}</Typography>
    </Box>
  );
}
