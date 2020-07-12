import React, { useEffect } from "react";
import "./App.css";
import { Grid, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import Map from "./Map";
import HeaderBar from "./HeaderBar";

import { useDispatch, useSelector } from "react-redux";
import { fetchCommunitiesBegin, fetchCommunitiesEnd } from "./redux/slices/communities";
import { fetchApartmentsBegin, fetchApartmentsEnd } from './redux/slices/apartments';

import { getStatus } from "./redux/selectors";

import { Switch, Route } from "react-router-dom";
import CommunityPage from "./CommunityPage";

import { getCommunities, getApartments } from './firestore';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommunitiesBegin());
    dispatch(fetchApartmentsBegin());
    getCommunities()
      .then(communities => dispatch(fetchCommunitiesEnd({success: true, communities})))
      .catch(e => fetchCommunitiesEnd({success: false}))

      getApartments()
      .then(apartments => dispatch(fetchApartmentsEnd({success: true, apartments})))
      .catch(e => fetchApartmentsEnd({success: false}))
  }, [dispatch]);
  const status = useSelector(getStatus);

  // switch (status) {
  //   case "NONE":
  //   case "WAITING":
  //     return <HeaderBar />;
  //   case "ERROR":
  //     return <HeaderBar />;
  //   default:
  //     break;
  // }

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
            <Switch>
              <Route exact path="/">
                <Map zoom={5} />
              </Route>
              {/* <Route path="/communities">
                <CommunityPage />
              </Route> */}
              <Route path="/communities/:communityId?">
                <CommunityPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
