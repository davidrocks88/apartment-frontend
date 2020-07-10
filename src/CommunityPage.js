import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { getCommunityById, getSelectedCommunity } from "./redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { selectCommunity } from "./redux/actions";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GoogleMapReact from "google-map-react";

import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "80em",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function CommunityPage() {
  const classes = useStyles();

  const { communityId } = useParams();
  const dispatch = useDispatch();
  const parmasCommunity = useSelector(getCommunityById(communityId));
  const selectedCommunity = useSelector(getSelectedCommunity);
  const mapRef = useRef();

  let community = parmasCommunity;

  if (parmasCommunity && !selectedCommunity) {
    dispatch(selectCommunity(communityId));
  }
  else if ((!parmasCommunity && communityId) ||
           (!parmasCommunity && !selectedCommunity)) {
    return <h1 style={{marginTop: "3em"}}>ERROR, cannot find community {communityId}</h1>;
  } else if (!communityId) {
    if (selectCommunity) {
      community = selectedCommunity;
    }
  }

  if (mapRef && mapRef.current) {
    mapRef.current.panTo({
      lat: community.lat,
      lng: community.lng
    });
  }

  return (
    <div>
      <div style={{ height: "3em" }}></div>
      <h1>Community:</h1>
      <h2>{community.community_id}</h2>

      <div className={classes.root}>
        <GridList cellHeight={400} spacing={2} className={classes.gridList}>
          {community.images.map((img, i) => (
            <GridListTile height={200} key={img}>
              <img height={200} src={img} alt={`${community.name} ${i}`} />
            </GridListTile>
          ))}
        </GridList>
      </div>

      <div style={{ height: "50em", width: "50em" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDxGdw5GtzpAP9Kfri9NCE_LxP5YxpYTAk" }}
        defaultCenter={[community.lat, community.lng]}
        defaultZoom={15}
        distanceToMouse={() => {}}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
      >
        <RoomTwoToneIcon style={{color: deepPurple[400]}} lat={community.lat} lng={community.lng} />
      </GoogleMapReact>
    </div>
    </div>
  );
}
