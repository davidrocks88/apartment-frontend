import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import * as geolib from "geolib";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";
import { deepPurple } from "@material-ui/core/colors";
import Grow from "@material-ui/core/Grow";
import { useSelector, useDispatch } from "react-redux";
import { getCommunities, getSelectedCommunity, getSelectedCommunityId, getCommunityByIndex } from "./redux/selectors";
import { selectCommunity } from "./redux/actions";

const Marker = ({ index, setCenter, isSelected }) => {
  const defaultColor = 900;
  const hoverColor = 400;
  const defaultSize = "2em";
  const hoverSize = "2.5em";

  const [color, setColor] = useState(isSelected ? hoverColor : defaultColor);
  const [size, setSize] = useState(isSelected ? hoverSize : defaultSize);
  const dispatch = useDispatch();
  const community = useSelector(getCommunityByIndex(index));

  return (
    // <Grow in={isHovering}>
      <RoomTwoToneIcon
        onClick={() => {setCenter(community.lat, community.lng); dispatch(selectCommunity(community.community_id))}}
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
      />
    // </Grow>
  );
};

export default function Map({ zoom }) {
  const selectedCommunity = useSelector(getSelectedCommunity);
  const selectedCommunityId = useSelector(getSelectedCommunityId);

  const communities = useSelector(getCommunities);
  const mapRef = useRef();
  let center = [0, 0];

  if (communities && communities.length) {
    const geoCenter = geolib.getCenter(
      communities.map((c) => {
        return {
          latitude: c.lat,
          longitude: c.lng,
        };
      })
    );
    center = [geoCenter.latitude, geoCenter.longitude];
  }

  const markers = communities.map((c, i) => (
    <Marker
      lat={c.lat}
      lng={c.lng}
      index={i}
      key={c.name}
      setCenter={(lat, lng) => mapRef.current.panTo({ lat, lng })}
      isSelected={selectedCommunity ? selectedCommunity.community_id === c.community_id : false}
    />
  ));

  if (selectedCommunity) {
      mapRef.current.panTo({lat: selectedCommunity.lat, lng: selectedCommunity.lng})
      mapRef.current.setZoom(8);
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
