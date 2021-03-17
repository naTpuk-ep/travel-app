import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, Polygon } from "react-leaflet";
import React from "react";
import { Button } from "react-bootstrap";
import ICountryData from "../../models/country-data";
import "./Map.scss";
import geoData from "../../assets/geoJson/countries";
import markerIcon from "../../assets/images/marker.png";
import fullScreenImage from "../../assets/images/fullscreen.png";

interface IMapProps {
  countryData: ICountryData | undefined;
}

class Map extends React.Component<IMapProps> {
  icon: L.DivIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [15, 0],
  });

  zoom = 3;

  redOptions = { color: "red" };

  // eslint-disable-next-line
  fullScreen = (e: any): void => {
    if (!document.fullscreenElement) {
      if (e.currentTarget === e.target) {
        e.nativeEvent.path[1].children[1].requestFullscreen();
      } else {
        e.nativeEvent.path[2].children[1].requestFullscreen();
      }
    }
  };

  // eslint-disable-next-line
  render() {
    const { countryData } = this.props;
    const {
      ISOCode,
      capitalLocation: { coordinates },
      // eslint-disable-next-line
    } = countryData!;
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    const copyObj = JSON.parse(JSON.stringify(geoData));
    // eslint-disable-next-line
    const info: any = copyObj;
    // eslint-disable-next-line
    const data: any = info[ISOCode].map((el: any) => {
      el[0].map((item: number[]) => {
        return item.reverse();
      });
      return el;
    });

    // const { latitude, longitude, data } = this.state;
    const position: LatLngExpression = [latitude, longitude];
    return (
      <div className="map-container">
        <Button
          variant="white"
          className="fullscreen-btn"
          onClick={(e) => {
            this.fullScreen(e);
          }}
        >
          <span className="fullscreen-btn-span">⇲</span>
        </Button>
        <MapContainer
          center={position}
          zoom={this.zoom}
          scrollWheelZoom={false}
          className="leaflet-container"
        >
          <TileLayer
            attribution="&copy; <a href='https://carto.com/'>carto.com</a> contributors"
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          />
          <Marker icon={this.icon} position={[latitude, longitude]}>
            <Popup>
              <span>Capital of country!</span>
            </Popup>
          </Marker>
          <Polygon pathOptions={this.redOptions} positions={data} />
        </MapContainer>
      </div>
    );
  }
}

export default Map;
