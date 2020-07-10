import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getApartmentsByCommunityId, getSelectedCommunityId, getSelectedCommunity } from './redux/selectors';
import {ApartmentPricePopover} from './ApartmentPricePopover';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Popover} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});

function getBedroomString(beds) {
  switch (beds) {
    case 0:
      return "Studio";
    case 1:
      return "1 Bedroom";
    default:
      return beds + " Bedrooms";
  }
}

function getBathroomString(baths) {
  switch (baths) {
    case 0:
      return "No Bathroom";
    case 1:
      return "1 Bathroom";
    default:
      return baths + " Bathrooms";
  }
}

export default function ApartmentTable() {
  const classes = useStyles();
  const community_id = useSelector(getSelectedCommunity).community_id;
  const apartments = useSelector(getApartmentsByCommunityId(community_id));

  return (
    <TableContainer component={Paper} elevation={6}>
      <Table stickyHeader className={classes.table} aria-label="sticky table">
      <TableHead>
          <TableRow>
            <TableCell>Unit</TableCell>
            <TableCell align="right">Beds</TableCell>
            <TableCell align="right">Baths</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apartments.map((apartment) => (
            <TableRow hover key={apartment.name}>
              <TableCell component="th" scope="row">
                {apartment.apartmentNumber}
              </TableCell>
              <TableCell align="right">{getBedroomString(apartment.beds)}</TableCell>
              <TableCell align="right">{getBathroomString(apartment.baths)}</TableCell>
              <TableCell align="right">{apartment.size} ft<sup>2</sup></TableCell>
              <TableCell align="right">${apartment.prices[0].price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
