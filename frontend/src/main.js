import "./style.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import osmtogeojson from "osmtogeojson";
import ways from "../data/ways";
import polygon from "../data/polygon";
import "../node_modules/leaflet-geosearch/dist/geosearch.css";
import * as GeoSearch from "leaflet-geosearch";

const map = L.map("map").setView([33.769, 8.746], 6);

const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

osm.addTo(map);

const CartoDB_DarkMatter = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);

const basemaps = {
  "Open Street Map": osm,
  "CatroDB Dark": CartoDB_DarkMatter,
};

//*********** add GeoJSON data ***********
L.geoJSON([ways, polygon]).addTo(map);

//*********** layer group ***********
const layerGroup = L.control.layers(basemaps).addTo(map).expand();

//*********** geosearch plugin ***********
const search = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
});

map.addControl(search);

//***********Overpass API  ***********

const result = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  // The body contains the query
  // to understand the query language see "The Programmatic Query Language" on
  // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
  body:
    "data=" +
    encodeURIComponent(`
      [out:json][timeout:100];
      (way[highway]
        (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
      );
        out body;
        >;
        out skel qt;
      `),
})
  .then((data) => data.json())
  .catch((err) => console.log(err));

// console.log(JSON.stringify(result, null, 2));

const convertResult = osmtogeojson(result);

console.log(convertResult);

L.geoJSON(convertResult).addTo(map);
