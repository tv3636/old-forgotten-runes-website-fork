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
        background-image: url("static/img/frame.png");
        background-size: 241px 228px;
  }

  .leaflet-popup-content {
      scroll-snap-type: y mandatory;
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

  .wizard-image {
      scroll-snap-align: end;
      position: absolute;
      margin-top: 20px;
      margin-left: 12px;
  }

  .wizard-image-div {
      height: 200px;
      width: 200px;
      position: relative;
  }

  @font-face {
      font-family: "Alagard";
      src: url("/static/game/wizards/alagard.otf") format("opentype");
    }

  .name-div {
      width: 143px;
      height: 33px;
      position: absolute;
      left: 50px;
      top: 2px;
  }

  .wizard-name {
      text-align: center;
      position: relative;
      z-index: 1;
      margin-top: 0.1em;
      margin-left: 0.6em;
      margin-right: 0.6em;
      line-height: 16px;

      
      color: #dfd1a8;
      font-family: "Alagard";
      font-size: 13px;
  }
`;

const locationJson = require('../data/locationMapping.json');
const image_base_url = 'https://nftz.forgottenrunes.com/wizards/alt/400-nobg/wizard-';
const opensea_base_url = 'https://opensea.io/assets/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42/';

function updateName(location: any) {
    const thisIndex = Math.floor((document.getElementsByClassName('leaflet-popup-content')[0].scrollTop + 5) / 200);
    const nameTag = document.getElementsByClassName('wizard-name')[0] as HTMLElement;

    nameTag.innerText = locationJson[location].wizards[thisIndex].name;
}

function LocationMarker(props: any) {
    if ('lat' in locationJson[props.item]) {
        return (
            <Marker key={props.index} position={[locationJson[props.item].lat, locationJson[props.item].lng]} title={`${props.item}`} >
                  <Popup maxHeight={200} maxWidth={200}>
                  <div onMouseOver={() => updateName(props.item)}>
                        <div className='name-div'><h3 className='wizard-name'>{locationJson[props.item].wizards[0].name}</h3></div>
                        {locationJson[props.item].wizards.map((wizard: any, index: any) =>
                          <div className='wizard-image-div'>
                          <a href={opensea_base_url + wizard.id}>
                              <img className='wizard-image' src={image_base_url + wizard.id + '.png'} height={175} width={175}/>
                          </a>
                          </div>
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
