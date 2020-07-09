import React, { useEffect } from "react";
import "./App.css";
import { Grid, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import Map from "./Map";
import HeaderBar from "./HeaderBar";

import { useDispatch, useSelector } from "react-redux";
import { fetchCommunitiesBegin, fetchCommunitiesEnd } from "./redux/actions";
import Axios from "axios";
import { getStatus, getCommunityByIndex } from "./redux/selectors";
import addPrices from "./utils/data.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommunitiesBegin());
    Axios.get("http://localhost:3001/communities")
      .then((response) => {
        const communities = addPrices(response.data.communities);
        dispatch(fetchCommunitiesEnd(true, communities));
      })
      .catch((err) => {
        dispatch(fetchCommunitiesEnd(false));
      });
  }, [dispatch]);
  const status = useSelector(getStatus);
  const c = useSelector(getCommunityByIndex(0));

  switch (status) {
    case "NONE":
    case "WAITING":
      return <HeaderBar />;
    case "ERROR":
      return <HeaderBar />;
    default:
      break;
  }

  return (
    <div>
      <HeaderBar />
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid
            item
            xs={3}
            style={{ height: "100vh", overflow: "auto", display: "block" }}
          >
            <Typography variant="h5" component="h1">
              Communities
            </Typography>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Map zoom={5} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
