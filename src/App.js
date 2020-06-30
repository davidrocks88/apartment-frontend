import React from "react";
import "./App.css";
import { Grid, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import Map from "./Map";

import useAxios from "axios-hooks";

function App() {
  const [{ data, loading, error }] = useAxios(
    "http://localhost:3001/communities"
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

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
          <Sidebar communities={data.communities} />
        </Grid>
        <Grid item xs={9}>
          <Map communities={data.communities} zoom={5} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
