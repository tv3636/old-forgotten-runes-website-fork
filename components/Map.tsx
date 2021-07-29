import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "@emotion/styled";
import {
  MapContainer,
  TileLayer,
  ImageOverlay,
  Marker,
  Popup,
  useMapEvents
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
`;

const locationJson = require('../data/locationMapping.json');
const ipfs_base_url = 'https://ipfs.io/ipfs/QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/';

interface mapLocation {
    location: string,
    lat: number,
    lon: number,
    wizards: any
};

const list : mapLocation[] = [
    {
        location: "Wood",
        lat: 1.5616648585079145, 
        lon: 0.42945312500000006,
        wizards: []
    },
    {
        location: "Wild",
        lat: 3.5494014838450294, 
        lon: 1.8017578125000002,
        wizards: []
    },
    {
        location: "Quantum Shadow",
        lat: -1.4375416705457718, 
        lon: 7.032265625000001,
        wizards: []
    },
    {
        location: "Sands",
        lat: -7.287296870330252, 
        lon: 5.443296432495117,
        wizards: []
    },
    {
        location: "Oasis",
        lat: -7.047486501133198, 
        lon: 8.695249557495119,
        wizards: []
    },
    {
        location: "Valley",
        lat: -2.620516682046257, 
        lon: 8.814897537231447,
        wizards: []
    },
    {
        location: "Platonic Shadow",
        lat: -4.09552408566189, 
        lon: 8.409605026245119,
        wizards: []
    },
    {
        location: "Marsh",
        lat: 1.1344967836973138, 
        lon: 3.9809131622314458,
        wizards: []
    },
    {
        location: "Obelisk",
        lat: -4.659742538615002, 
        lon: 6.419878005981446,
        wizards: []
    },
    {
        location: "Citadel",
        lat: -2.049704377901014, 
        lon: -6.456098556518556,
        wizards: []
    },
    {
        location: "Mist",
        lat: 1.481873260162654, 
        lon: 8.519468307495119,
        wizards: []
    },
    {
        location: "Salt",
        lat: 2.689546311929564, 
        lon: -7.366762161254884,
        wizards: []
    },
    {
        location: "Surf",
        lat: -6.371002854929476, 
        lon: -2.818422317504883,
        wizards: []
    },
    {
        location: "Brine",
        lat: -4.358478500880833, 
        lon: -8.685121536254885,
        wizards: []
    },
    {
        location: "Riviera",
        lat: -4.599439409670915, 
        lon: 0.01605033874511719,
        wizards: []
    },
    {
        location: "Fey",
        lat: 4.032768401966701, 
        lon: 4.539413452148438,
        wizards: []
    },
    {
        location: "Veil",
        lat: 6.417660165363671, 
        lon: 3.528671264648438,
        wizards: []
    },
    {
        location: "Toadstools",
        lat: 3.967011000868007, 
        lon: 6.802597045898438,
        wizards: []
    },
    {
        location: "Wold",
        lat: 3.6162185687724855, 
        lon: -1.3492584228515625,
        wizards: []
    },
    {
        location: "Thorn",
        lat: 0.8060952321492764, 
        lon: 6.516952514648438,
        wizards: []
    },
    {
        location: "Cuckoo Land",
        lat: 7.36323297225163, 
        lon: 6.630506515502931,
        wizards: []
    },
    {
        location: "Psychic Leap",
        lat: 6.556242027192075, 
        lon: 7.597303390502931,
        wizards: []
    },
    {
        location: "Carnival",
        lat: 2.3731405225423527, 
        lon: 3.2247447967529297,
        wizards: []
    },
    {
        location: "Sacred Pillars",
        lat: 7.101659219298023, 
        lon: -2.0926380157470708,
        wizards: []
    },
    {
        location: "Lake",
        lat: 5.047940217465466, 
        lon: -0.6204700469970704,
        wizards: []
    },
    {
        location: "Bastion",
        lat: 5.551149422965898, 
        lon: 2.32386589050293,
        wizards: []
    },
    {
        location: "Realm",
        lat: 6.905380920555986, 
        lon: -0.07115364074707033,
        wizards: []
    },
    {
        location: "Keep",
        lat: -2.1520416519568775, 
        lon: -3.5208606719970708,
        wizards: []
    },
    {
        location: "Capital",
        lat: 0.48416515144996225, 
        lon: -6.97056770324707,
        wizards: []
    },
    {
        location: "Isle",
        lat: -5.439484310404568, 
        lon: -4.580698013305665,
        wizards: []
    },
];

list.forEach(element => element.wizards = locationJson[element.location]);

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

    {list.map((item, index) => 
    <Marker key={index} position={[item.lat, item.lon]} title={`${item.location}`} >
      <Popup maxHeight={200} maxWidth={200}>
        {item.wizards.map((wizard: any, index: any) =>
            <img src={ipfs_base_url + wizard.id + '.png'} height={100} width={100} />
        )}
      </Popup>
    </Marker>
    )}
    </MapContainer>
  </MapStyles>
);

export default Map;
