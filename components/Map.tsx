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
  img.leaflet-image-layer {
    image-rendering: pixelated;
  }

  .leaflet-popup-content {
      width: 361.5px;
      scroll-snap-type: y mandatory;
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

  .wizard-image-div {
      height: 171px;
      width: 180.75px;
      position: relative;
      background-image: url("static/img/frame.png");
      background-size: 180.75px 171px;
      display: inline-block;
      scroll-snap-align: end;
  }

  .wizard-image {
      margin-left: 11%;
      margin-top: 17%;
  }

  @font-face {
      font-family: "Alagard";
      src: url("/static/game/wizards/alagard.otf") format("opentype");
    }

  .name-div {
      width: 107.25px;
      height: 24.75px;
      position: absolute;
      left: 37.5px;
      top: 1.5px;
  }

  .wizard-name {
      text-align: center;
      position: relative;
      z-index: 1;
      margin-top: 0.1em;
      margin-left: 0.5em;
      margin-right: 0.5em;
      line-height: 1em;

      
      color: #dfd1a8;
      font-family: "Alagard";
      font-size: 1em;
  }
`;

const locationJson = require('../data/locationMapping.json');
const image_base_url = 'https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-';
const opensea_base_url = 'https://opensea.io/assets/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42/';

const newicon : any = L.icon({
  iconUrl: require("../public/static/img/mapMarker.png"),
  iconSize: [24, 37.5]
});

function WizardCard(props: any) {
    return (
        <div className='wizard-image-div'>
            <div className='name-div'><h3 className='wizard-name'>{props.name}</h3></div>
            <a href={opensea_base_url + props.token_id}>
                <img className='wizard-image' src={image_base_url + props.token_id + '.png'} height={131.25} width={131.25}/>
            </a>
        </div>
    )
}

function LocationMarker(props: any) {
    if ('lat' in locationJson[props.item]) {
        return (
            <Marker key={props.index} position={[locationJson[props.item].lat, locationJson[props.item].lng]} title={`${props.item}`} icon={newicon} >
                  <Popup maxHeight={342} maxWidth={361.5}>
                  <div>
                        {locationJson[props.item].wizards.map((wizard: any, index: any) =>
                          <WizardCard token_id={wizard.id} name={wizard.name}/>
                        )}
                   </div>
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
