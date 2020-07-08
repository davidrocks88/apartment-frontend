import React, { useEffect } from "react";
import "./App.css";
import { Grid, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import Map from "./Map";

import { useDispatch, useSelector } from "react-redux";
import { fetchCommunitiesBegin, fetchCommunitiesEnd } from "./redux/actions";
import Axios from "axios";
import { getStatus } from "./redux/selectors";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommunitiesBegin());
    Axios.get("http://localhost:3001/communities")
      .then((response) => {
        dispatch(fetchCommunitiesEnd(true, response.data.communities));
      })
      .catch((err) => {
        dispatch(fetchCommunitiesEnd(false));
      });
  }, [dispatch]);
  const status = useSelector(getStatus)

    switch (status) {
      case "WAITING":
        return <p>Loading...</p>;
      case "ERROR":
        return <p>Error!</p>
      default:
        break;
    }


  return (
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
          <Map
            zoom={5}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
