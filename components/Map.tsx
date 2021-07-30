import Layout from "../components/Layout";
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
import { LatLngBounds } from "leaflet";

const width = 20;
const height = 16;
const scale = 1;

const bounds = new LatLngBounds(
  [(-height / 2) * scale, (-width / 2) * scale],
  [(height / 2) * scale, (width / 2) * scale]
);

const MapStyles = styled.div`
  height: 100%;
  img.leaflet-image-layer {
    image-rendering: pixelated;
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
`;

const locationJson = require('../data/locationMapping.json');
const image_base_url = 'https://nftz.forgottenrunes.com/wizards/';
const opensea_base_url = 'https://opensea.io/assets/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42/';

function LocationMarker(props: any) {
    if ('lat' in locationJson[props.item]) {
        return (
            <Marker key={props.index} position={[locationJson[props.item].lat, locationJson[props.item].lng]} title={`${props.item}`} >
                  <Popup maxHeight={200} maxWidth={200}>
                        {locationJson[props.item].wizards.map((wizard: any, index: any) =>
                          <a href={opensea_base_url + wizard.id}>
                              <img src={image_base_url + wizard.id + '.png'} height={100} width={100} title={wizard.name}/>
                          </a>
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
