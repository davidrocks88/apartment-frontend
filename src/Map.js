import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import * as geolib from "geolib";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import { deepPurple } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  getCommunities,
  getSelectedCommunity,
  getCommunityByIndex,
} from "./redux/selectors";
import { selectCommunity } from "./redux/slices/communities";
import MapPopover from "./MapPopover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Popover} from "@material-ui/core";

const Marker = ({ index, setCenter, isSelected }) => {
  const defaultColor = 900;
  const hoverColor = 400;
  const defaultSize = "2em";
  const hoverSize = "2.5em";

  const [color, setColor] = useState(isSelected ? hoverColor : defaultColor);
  const [size, setSize] = useState(isSelected ? hoverSize : defaultSize);
  const dispatch = useDispatch();
  const community = useSelector(getCommunityByIndex(index));
  const clickMarker = () => dispatch(selectCommunity(community.id));
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div onClick={clickMarker}>
          <RoomTwoToneIcon
            onMouseEnter={() => {
              setColor(hoverColor);
              setSize(hoverSize);
            }}
            onMouseLeave={() => {
              if (!isSelected) {
                setColor(defaultColor);
                setSize(defaultSize);
              }
            }}
            style={{ color: deepPurple[color], fontSize: size }}
            {...bindTrigger(popupState)}
          />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MapPopover community={community}/>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default function Map({ zoom }) {
  const selectedCommunity = useSelector(getSelectedCommunity);
  const communities = useSelector(getCommunities);
  const mapRef = useRef();
  let center = [0, 0];

  if (communities && communities.length) {
    const geoCenter = geolib.getCenter(
      communities.map((c) => c.location)
    );
    center = [geoCenter.latitude, geoCenter.longitude];
  }

  const markers = communities.map((c, i) => (
    <Marker
      lat={c.location.latitude}
      lng={c.location.longitude}
      index={i}
      key={c.name}
      setCenter={(lat, lng) => mapRef.current.panTo({ lat, lng })}
      isSelected={
        selectedCommunity
          ? selectedCommunity.id === c.id
          : false
      }
    />
  ));

  if (selectedCommunity && mapRef && mapRef.current) {
    mapRef.current.panTo({
      lat: selectedCommunity.location.latitude,
      lng: selectedCommunity.location.longitude,
    });
    mapRef.current.setZoom(10);
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDxGdw5GtzpAP9Kfri9NCE_LxP5YxpYTAk" }}
        defaultCenter={center}
        defaultZoom={zoom}
        distanceToMouse={() => {}}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}
