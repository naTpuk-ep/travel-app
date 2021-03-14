import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, Polygon } from "react-leaflet";
import React from "react";
import { Button } from "react-bootstrap";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import "./map.scss";
import cData from "../../assets/geoJson/countries";
import marketImg from "../../assets/images/marker.png";

interface IProps {
  iso: string;
}

interface IState {
  latitude: number;
  longitude: number;
  // eslint-disable-next-line
  data: any;
}

class Map extends React.Component<IProps, IState> {
  icon: L.DivIcon = L.icon({
    iconUrl: marketImg,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [15, 0],
  });

  zoom = 1;

  redOptions = { color: "red" };

  constructor(props: IProps) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      data: [],
    };
  }

  // eslint-disable-next-line
  async componentDidUpdate(prevProps: IProps) {
    const { iso } = this.props;
    if (prevProps.iso !== iso) {
      const url = `https://rnovikov-travel-app-backend.herokuapp.com/countries/${iso}`;
      const response = await fetch(url);
      const newData = await response.json();
      // eslint-disable-next-line
      const info: any = cData;
      // eslint-disable-next-line
      const mass: any = info[iso].map((el: any) => {
        el[0].map((item: number[]) => {
          return item.reverse();
        });
        return el;
      });
      this.updateMap(newData, mass);
    }
  }

  // eslint-disable-next-line
  updateMap = (newData: any, mass: any): void => {
    this.setState({
      latitude: newData[0].capitalLocation.coordinates[0],
      longitude: newData[0].capitalLocation.coordinates[1],
      data: mass,
    });
  };

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
    const { latitude, longitude, data } = this.state;
    const position: LatLngExpression = [0, 0];
    return (
      <div className="map-container">
        <>
          <Button
            variant="dark"
            className="fullscreen-btn"
            onClick={(e) => {
              this.fullScreen(e);
            }}
          >
            <FullscreenIcon>icon</FullscreenIcon>
          </Button>
        </>
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
