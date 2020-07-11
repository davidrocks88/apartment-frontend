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
} from "@material-ui/core";
import {
  getApartmentsByCommunityId,
  getSelectedCommunity,
} from "./redux/selectors";
import ApartmentPricePopover from "./ApartmentPricePopover";
import { getBedroomString, getBathroomString, getSqftString } from './utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { getShowApartmentUnitModal } from './redux/selectors';
import { selectApartment, showApartmentData, hideApartmentData } from './redux/actions';

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
  // const [open, setOpen] = useState(false);

  const handleOpen = (apartment) => {
    dispatch(selectApartment(apartment));
    dispatch(showApartmentData());
  };

  const handleClose = () => {
    dispatch(hideApartmentData());
  };

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
              <TableCell align="right">${apartment.prices[0].price}</TableCell>
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
