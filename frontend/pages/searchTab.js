import { osmTagMapping } from "../queries/queries.js";
import { map } from "../src/main.js";
import osmtogeojson from "osmtogeojson";

// *****************************  Fetch data Btn: start  *****************************

// get bbox
let coordString;
function bboxCoord(mapVariable) {
  map.on("pm:create", (e) => {
    const bounds = e.layer._bounds;
    const boundsString = `${bounds._southWest.lat}, ${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng}`;
    coordString = boundsString;
    console.log("boundsString:", boundsString);
  });
}

bboxCoord(map);

// get checkboxes and build query
const fetchBtn = document.getElementById("fetch-btn");
fetchBtn.addEventListener("click", fetchSearchData);

async function fetchSearchData() {
  const checkboxes = document.querySelectorAll(
    '#data-form input[name="layer"]:checked'
  );

  const layers = Array.from(checkboxes).map((layer) => layer.value);
  // console.log(checkboxes);

  // console.log("coordString:", coordString);

  const query = [];

  for (const layer of layers) {
    const tag = osmTagMapping[layer];
    if (tag) {
      query.push(`${tag}(${coordString});`);
    }
  }

  const fullQuery = `
      [out:json][timeout:100];
        (
        ${query.join("\n")}
        
        );
          out body;
          >;
          out skel qt;
          `;

  // console.log(fullQuery);

  // fetch the data
  const myData = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: "data=" + encodeURIComponent(fullQuery),
  })
    .then((myData) => myData.json())
    .catch((error) => console.log(error));

  const convertMyData = osmtogeojson(myData);

  L.geoJSON(convertMyData).addTo(map);
}
// *****************************  Fetch data Btn: end  *****************************
