import { osmTagMapping } from "../queries/queries.js";
import { map } from "../src/main.js";
import osmtogeojson from "osmtogeojson";

// *****************************  Fetch data Btn: start  *****************************
const fetchBtn = document.getElementById("fetch-btn");
fetchBtn.addEventListener("click", fetchSearchData);
// Bootsrap toast
const successToastDiv = document.getElementById("successToast");
const successToast = bootstrap.Toast.getOrCreateInstance(successToastDiv);

const warningToastDiv = document.getElementById("warningToast");
const warningToast = bootstrap.Toast.getOrCreateInstance(warningToastDiv);

// get bbox
let coordString;
function bboxCoord(mapVariable) {
  let currentRectangle = null;
  map.on("pm:create", async (e) => {
    const bounds = e.layer._bounds;
    const boundsString = `${bounds._southWest.lat}, ${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng}`;
    coordString = boundsString;
    // console.log("boundsString:", boundsString);
    if (e.layer.pm._shape === "Rectangle") {
      if (currentRectangle) {
        currentRectangle.remove();
      }

      currentRectangle = e.layer;
    }
  });
}

bboxCoord(map);

// get checkboxes and build query
async function fetchSearchData() {
  const checkboxes = document.querySelectorAll(
    '#data-form input[name="layer"]:checked'
  );

  const layers = Array.from(checkboxes).map((layer) => layer.value);
  // console.log(checkboxes);

  // if (!coordString || layers.length === 0) {
  if (layers.length === 0) {
    return warningToast.show();
  }
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

  // successful toast
  successToast.show();
}
// *****************************  Fetch data Btn: end  *****************************
