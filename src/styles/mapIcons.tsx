import ReactDOMServer  from 'react-dom/server';
import Leaflet, { Icon, DivIcon } from "leaflet";
import { themeObject } from "./theme";

// Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import HydrantIcon from "../assets/fire-hydrant.png";
import ValveIcon from "../assets/valve.png";

type MapIcons = {
  [key: string]: DivIcon | Icon;
}

export const mapIcons: MapIcons = {};

mapIcons['blue'] = Leaflet.divIcon({
  html: ReactDOMServer.renderToString(<FaMapMarkerAlt size={32} color={themeObject.colors.custom[500]} />),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

mapIcons['red'] = Leaflet.divIcon({
  html: ReactDOMServer.renderToString(<FaMapMarkerAlt size={32} color={themeObject.colors.custom[700]} />),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

mapIcons['hidrante de coluna'] = Leaflet.icon({
  iconUrl: HydrantIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

mapIcons['registro'] = Leaflet.icon({
  iconUrl: ValveIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
