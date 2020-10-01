import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Companymap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: props.lt, lng: props.ln }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.lt, lng: props.ln }} />
      )}
    </GoogleMap>
  ))
);

export default Companymap;
