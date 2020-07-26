import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Fade,
  Backdrop,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import {
  getApartmentsByCommunityId,
  getSelectedCommunity,
} from "./redux/selectors";
import ApartmentPricePopover from "./ApartmentPricePopover";
import {
  getBedroomString,
  getBathroomString,
  getSqftString,
  analyzeApartmentPrices,
  getColorFromPercentage,
  getIconFromPercentage,
} from "./utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  getShowApartmentUnitModal,
  getApartmentRoomsFilter,
} from "./redux/selectors";
import {
  selectApartment,
  showApartmentUnitModal,
  hideApartmentUnitModal,
  filterRooms,
} from "./redux/slices/apartments";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    boxShadow: 2,
    padding: 10,
  },
});

export default function ApartmentTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector(getShowApartmentUnitModal);
  const filter = useSelector(getApartmentRoomsFilter);

  const handleOpen = (apartment) => {
    dispatch(selectApartment(apartment));
    dispatch(showApartmentUnitModal());
  };

  const handleClose = () => {
    dispatch(hideApartmentUnitModal());
  };

  const handleChange = (_, newValue) => {
    dispatch(filterRooms(newValue));
  };

  const community_id = useSelector(getSelectedCommunity).id;
  const apartments = useSelector(getApartmentsByCommunityId(community_id));

  let filteredApartments = apartments;
  if (filter >= 0) {
    filteredApartments = filteredApartments.filter((a) => a.beds === filter);
  }

  return (
    <TableContainer component={Paper} elevation={6}>
      <Tabs
        value={filter}
        variant="fullWidth"
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="All" value={-1} />
        <Tab label="Studio" value={0} />
        <Tab label="1 Bedroom" value={1} />
        <Tab label="2 Bedrooms" value={2} />
      </Tabs>
      <Table stickyHeader className={classes.table} aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Unit</TableCell>
            <TableCell align="right">Beds</TableCell>
            <TableCell align="right">Baths</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredApartments.map((apartment) => (
            <TableRow
              hover
              key={apartment.apartmentNumber}
              onClick={() => handleOpen(apartment)}
            >
              <TableCell component="th" scope="row">
                {apartment.apartmentNumber}
              </TableCell>
              <TableCell align="right">
                {getBedroomString(apartment.beds)}
              </TableCell>
              <TableCell align="right">
                {getBathroomString(apartment.baths)}
              </TableCell>
              <TableCell align="right">
                {getSqftString(apartment.size)}
              </TableCell>
              <TableCell align="right">${apartment.currentPrice.toLocaleString('en-us')}</TableCell>
              <TableCell align="right">
                <Typography
                  variant="button"
                  style={{
                    color: getColorFromPercentage(
                      analyzeApartmentPrices(apartment)
                    ),
                  }}
                >
                  {getIconFromPercentage(analyzeApartmentPrices(apartment))}{" "}
                  {Math.abs(
                    Math.round(analyzeApartmentPrices(apartment) * 10000) / 100
                  )}
                  %
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper>
            <ApartmentPricePopover />
          </Paper>
        </Fade>
      </Modal>
    </TableContainer>
  );
}
