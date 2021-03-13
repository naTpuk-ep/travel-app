import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, Polygon } from "react-leaflet";
import React from "react";
import { Button } from "react-bootstrap";
import cData from "../../assets/geoJson/countries";
import marketImg from "../../assets/images/marker.png";

interface ICapitalPosition {
  latitude: number;
  longitude: number;
}

// eslint-disable-next-line
const data: any = cData.Italy;

// eslint-disable-next-line
const mass: any = data.map((el: any) => {
  // eslint-disable-next-line
  el[0].map((item: any) => {
    return item.reverse();
  });
  return el;
});

function fullScreen(e: any): void {
  console.log(e);
  if (!document.fullscreenElement) {
    e.target.nextSibling.requestFullscreen();
  } else {
    e.target.nextSibling.exitFullscreen();
  }
}

const Map: React.FunctionComponent = () => {
  const position: LatLngExpression = [41.902782, 12.496365];
  const zoom = 5;
  const list: ICapitalPosition = {
    latitude: 41.902782,
    longitude: 12.496365,
  };
  const icon: L.DivIcon = L.icon({
    iconUrl: marketImg,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [15, 0],
  });
  const purpleOptions = { color: "purple" };

  return (
    <div className="map-container">
      <>
        <Button
          variant="dark"
          className="fullscreen-btn"
          onClick={(e) => {
            fullScreen(e);
          }}
        >
          FullScreen
        </Button>
      </>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution="&copy; <a href='https://carto.com/'>carto.com</a> contributors"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        <Marker icon={icon} position={[list.latitude, list.longitude]}>
          <Popup>
            <span>Capital of country!</span>
          </Popup>
        </Marker>
        <Polygon pathOptions={purpleOptions} positions={mass} />
      </MapContainer>
    </div>
  );
};

export default Map;
