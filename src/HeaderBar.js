import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import { getStatus } from "./redux/selectors";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderBar() {
  const classes = useStyles();

  const status = useSelector(getStatus);
  let statusItem;

  switch (status) {
    case "NONE":
    case "WAITING":
      statusItem = <Typography variant="h6">Loading...</Typography>;
      break;
    case "ERROR":
      statusItem = <Typography variant="h6">Error!</Typography>;
      break;
    default:
      break;
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Apartment Price Tracker
          </Typography>
          <Link to="/">Home</Link>
          <Link to="/communities">community</Link>
          {statusItem}
          <Typography variant="h5">David Bernstein</Typography>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/in/dbernstein7/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://github.com/davidrocks88/apartment-frontend"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
