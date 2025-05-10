import "./style.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as GeoSearch from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-switch-basemap";
import "leaflet-switch-basemap/src/L.switchBasemap.css";

export const map = L.map("map").setView([33.769, 8.746], 6);

const osm = new L.basemapsSwitcher(
  [
    {
      layer: L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map), //DEFAULT MAP
      icon: "../assets/images/img1.PNG",
      name: "OSM",
    },
    {
      layer: L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"),
      icon: "../assets/images/img3.PNG",
      name: "Satellite",
    },
  ],
  { position: "topright" }
);

osm.addTo(map);

//*********** geosearch plugin ***********
const search = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
});

map.addControl(search);

//*********** Draw plugin ***********
map.pm.addControls({
  position: "topleft",
  drawRectangle: true,
  drawMarker: false,
  drawCircleMarker: false,
  drawCircle: false,
  drawPolyline: false,
  drawPolygon: false,
  drawText: false,
  editControls: true,
  cutPolygon: false,
  rotateMode: false,
});
