import Layout from "../components/Layout";
import WizardCard from "../components/WizardCard";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "@emotion/styled";
import {
  MapContainer,
  TileLayer,
  ImageOverlay,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import * as L from "leaflet";

const width = 20;
const height = 16;
const scale = 1;

const bounds = new L.LatLngBounds(
  [(-height / 2) * scale, (-width / 2) * scale],
  [(height / 2) * scale, (width / 2) * scale]
);

const MapStyles = styled.div`
  height: 100%;
  .leaflet-container {
    background-color: black;
  }
  img.leaflet-image-layer {
    image-rendering: pixelated;
  }

  .leaflet-popup-content {
      height: 382px;
      width: 361.5px;
      overflow: scroll;
  }

  .leaflet-popup-content-wrapper {
      background: #030d04;
  }

  .leaflet-popup-scrolled {
      border-bottom: none;
      border-top: none;
  }

  .leaflet-popup-tip {
      background: #030d04;
  }

  .leaflet-marker-icon {
      opacity: 0;
  }

  .leaflet-marker-icon:hover {
      opacity: 100;
  }

  .leaflet-marker-icon:focus {
      opacity: 100;
  }

  .leaflet-marker-shadow {
      opacity: 0;
  }

  .leaflet-popup-close-button {
      display: none;
  }
  
  .leaflet-bar a,
  .leaflet-bar a:hover {
    background-color: #393245;
    color: #ececec;
  }
  .leaflet-bar a:hover {
    background-color: #18151e;
  }

  .leaflet-touch .leaflet-control-layers,
  .leaflet-touch .leaflet-bar {
    border: none;

  }
`;

const WizardWrapper = styled.div`
    max-width: 50%;
    display: inline-block;
    margin-bottom: -5%;
    font-size: 0.8em;
`;

const locationJson = require('../data/locationMapping.json');
const newicon : any = L.icon({
  iconUrl: require("../public/static/img/mapMarker.png"),
  iconSize: [24, 37.5]
});

function LocationMarker(props: any) {
    if ('lat' in locationJson[props.item]) {
        return (
            <Marker key={props.index} position={[locationJson[props.item].lat, locationJson[props.item].lng]} title={`${props.item}`} icon={newicon} >
                  <Popup maxHeight={382} maxWidth={361.5}>
                    {locationJson[props.item].wizards.map((wizard: any) =>
                      <WizardWrapper>
                        <WizardCard id={wizard.id} name={wizard.name} />
                      </WizardWrapper>
                    )}
                  </Popup>
            </Marker>
        )
    } else {
        return (null);
    }
}

const Map = () => (
  <MapStyles>
    <MapContainer
      center={[0, 0]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      attributionControl={false}
    >
      <ImageOverlay bounds={bounds} url="/static/img/map/map.png" />

    {Object.keys(locationJson).map((item, index) => 
        <LocationMarker index={index} item={item}/>
    )}
    </MapContainer>
  </MapStyles>
);

export default Map;
