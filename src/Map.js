import React, { useRef } from "react";
import GoogleMapReact from "google-map-react";
import * as geolib from "geolib";
import RoomTwoToneIcon from "@material-ui/icons/RoomTwoTone";

const Marker = ({ community, setCenter }) => {
  return <RoomTwoToneIcon onClick={() => setCenter(community.lat, community.lng)} />;
};

export default function Map({ communities, zoom }) {
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

  const markers = communities.map((c) => (
    <Marker
      lat={c.lat}
      lng={c.lng}
      community={c}
      key={c.name}
      setCenter={(lat, lng) => mapRef.current.panTo({ lat, lng })}
    />
  ));

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