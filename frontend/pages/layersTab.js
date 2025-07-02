import L from "leaflet";
import layers from "../data/layers";
import { map } from "../src/main";
import { fetchedLayers, mergedDataObject } from "./searchTab";

// export function renderLayerCards() {
//   const container = document.getElementById("layers");
//   container.innerHTML = "";

//   // 1- add layer card functionalities:
//   // zoom to layer [x]
//   // remove  [x]
//   // download  [x]
//   // MERGE SAME FEATURES AS ONE LAYER CATEGORY  []
//   // hide/show sidebar and its length []
//   // visible
//   // arrtibutes

//   // 2- add hover text for layer card buttons

//   // ************  layer card functionalities  ************
//   function zoomToLayer(layerItem) {
//     map.fitBounds(layerItem.getBounds());
//   }

//   function removeCardLayer(layerId, layer) {
//     let card = document.getElementById(layerId);

//     if (card && map.hasLayer(layer)) {
//       card.remove();
//       map.removeLayer(layer);
//     }
//   }

//   function downloadLayer(layer, filename = "layer.geojson") {
//     const dataStr = JSON.stringify(layer, null, 2);

//     const blob = new Blob([dataStr], { type: "application/json" });

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     a.click();

//     URL.revokeObjectURL(url);
//   }

//   fetchedLayers.forEach((item) => {
//     const layer = L.geoJSON(item).addTo(map);

//     const card = document.createElement("div");
//     card.id = `${item.feature_id}`;
//     card.className = "layer-container card text-bg-dark border-secondary mb-3";
//     card.innerHTML = `
//         <div
//           class="layercontainer-name card-body"
//           style="display: flex; justify-content: space-between"
//         >
//           <h5 class="card-title">layer_name</h5>
//           <button id="show-layer-btn-${item.feature_id}" type="button" class="btn btn-warning btn-sm">
//             <img src="./assets/images/eye-fill.svg" alt="" />
//           </button>
//         </div>
//         <div class="layercontainer-functions text-center card-body">
//           <button id="remove-btn-${item.feature_id}" type="button" class="btn btn-light btn-sm">
//             <img src="./assets/images/trash-fill.svg" alt="" />
//           </button>
//           <button id="download-btn-${item.feature_id}" type="button" class="btn btn-light btn-sm">
//             <img src="./assets/images/download.svg" alt="" />
//           </button>
//           <button id="attributes-btn" type="button" class="btn btn-light btn-sm">
//             <img src="./assets/images/table.svg" alt="" />
//           </button>
//           <button id="zoom-to-layer-btn-${item.feature_id}" type="button" class="btn btn-light btn-sm">
//             <img src="./assets/images/search.svg" alt="" />
//           </button>
//         </div>
//     `;

//     container.appendChild(card);

//     // const btn = document.getElementById(`show-layer-btn-${item.feature_id}`);
//     const zoomToLayerBtn = document.getElementById(
//       `zoom-to-layer-btn-${item.feature_id}`
//     );
//     zoomToLayerBtn.addEventListener("click", () => zoomToLayer(layer));

//     const removeBtn = document.getElementById(`remove-btn-${item.feature_id}`);
//     removeBtn.addEventListener("click", () =>
//       removeCardLayer(item.feature_id, layer)
//     );

//     const downloadBtn = document.getElementById(
//       `download-btn-${item.feature_id}`
//     );
//     downloadBtn.addEventListener("click", () => {
//       const filename = `layer-${item.feature_id}.geojson`;
//       downloadLayer(item, filename);
//     });
//   });
// }

// *****************************************************
const mapLayers = {};

export function renderLayerCards() {
  // ***************** helper functions: start  *******************
  function toggleLayer(name) {
    const layer = mapLayers[name];
    if (!layer) return;

    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
    } else {
      layer.addTo(map);
    }
  }

  function downloadLayer(name) {
    const layer = mapLayers[name];
    if (!layer) return;

    const geojson = layer.toGeoJSON();
    const blob = new Blob([JSON.stringify(geojson)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.geojson`;
    a.click();

    URL.revokeObjectURL(url);
  }

  function deleteLayer(name) {
    const layer = mapLayers[name];
    if (layer && map.hasLayer(layer)) {
      map.removeLayer(layer);
    }

    delete mapLayers[name];

    // Also remove the card
    const btn = document.querySelector(
      `button[data-action="delete"][data-name="${name}"]`
    );
    if (btn) {
      const card = btn.closest(".card");
      if (card) card.remove();
    }
  }

  function getColorForCategory(tag) {
    const colors = {
      highway: "#ff7800",
      building: "#0074D9",
      landuse: "#2ECC40",
      waterway: "#39CCCC",
      railway: "#B10DC9",
      default: "#AAAAAA",
    };
    return colors[tag] || colors.default;
  }

  // ***************** helper functions: end  *******************

  const container = document.getElementById("layers");
  container.innerHTML = ""; // clear old

  mergedDataObject.forEach(({ name, geojson }) => {
    // Create Leaflet layer
    const layer = L.geoJSON(geojson, {
      style: { color: getColorForCategory(name), weight: 2 },
    }).addTo(map);

    // Fit map to layer
    map.fitBounds(layer.getBounds());

    // Store layer
    mapLayers[name] = layer;

    // Create card
    const card = document.createElement("div");
    card.className = "card my-2";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <button class="btn btn-sm btn-secondary" data-action="toggle" data-name="${name}">👁️ Toggle</button>
        <button class="btn btn-sm btn-primary" data-action="download" data-name="${name}">⬇️ Download</button>
        <button class="btn btn-sm btn-danger" data-action="delete" data-name="${name}">🗑️ Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach listeners
  container.querySelectorAll("button[data-action]").forEach((btn) => {
    const action = btn.dataset.action;
    const name = btn.dataset.name;

    btn.addEventListener("click", () => {
      if (action === "toggle") toggleLayer(name);
      if (action === "download") downloadLayer(name);
      if (action === "delete") deleteLayer(name);
    });
  });
}
