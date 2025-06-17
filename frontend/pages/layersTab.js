import L from "leaflet";
import layers from "../data/layers";
import { map } from "../src/main";
import { fetchedLayers } from "./searchTab";

export function renderLayerCards() {
  const container = document.getElementById("layers");
  container.innerHTML = "";

  // 1- add layer card functionalities:
  // zoom to layer [x]
  // remove  []
  // visible
  // download  []
  // arrtibutes

  // 2- add hover text for layer card buttons

  // ************  layer card functionalities  ************
  function zoomToLayer(layerItem) {
    map.fitBounds(layerItem.getBounds());
  }

  function removeCardLayer(layerId, layer) {
    let card = document.getElementById(layerId);

    if (card && map.hasLayer(layer)) {
      card.remove();
      map.removeLayer(layer);
    }
  }

  fetchedLayers.forEach((item) => {
    const layer = L.geoJSON(item).addTo(map);

    const card = document.createElement("div");
    card.id = `${item.feature_id}`;
    card.className = "layer-container card text-bg-dark border-secondary mb-3";
    card.innerHTML = `
        <div
          class="layercontainer-name card-body"
          style="display: flex; justify-content: space-between"
        >
          <h5 class="card-title">layer_name</h5>
          <button id="show-layer-btn-${item.feature_id}" type="button" class="btn btn-warning btn-sm">
            <img src="./assets/images/eye-fill.svg" alt="" />
          </button>
        </div>
        <div class="layercontainer-functions text-center card-body">
          <button id="remove-btn-${item.feature_id}" type="button" class="btn btn-light btn-sm">
            <img src="./assets/images/trash-fill.svg" alt="" />
          </button>
          <button id="download-btn" type="button" class="btn btn-light btn-sm">
            <img src="./assets/images/download.svg" alt="" />
          </button>
          <button id="attributes-btn" type="button" class="btn btn-light btn-sm">
            <img src="./assets/images/table.svg" alt="" />
          </button>
          <button id="zoom-to-layer-btn-${item.feature_id}" type="button" class="btn btn-light btn-sm">
            <img src="./assets/images/search.svg" alt="" />
          </button>
        </div>
    `;

    container.appendChild(card);

    // const btn = document.getElementById(`show-layer-btn-${item.feature_id}`);
    const zoomToLayerBtn = document.getElementById(
      `zoom-to-layer-btn-${item.feature_id}`
    );
    zoomToLayerBtn.addEventListener("click", () => zoomToLayer(layer));

    const removeBtn = document.getElementById(`remove-btn-${item.feature_id}`);
    removeBtn.addEventListener("click", () =>
      removeCardLayer(item.feature_id, layer)
    );
  });
}
