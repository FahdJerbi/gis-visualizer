import layers from "../data/layers";
// import {  } from "@fortawesome/fontawesome-free";

const layersContainer = document.getElementById("layers");

function showLayers() {
  layersContainer.innerHTML = "";

  if (layers.length === 0) {
    layersContainer.innerHTML = "<p>No Lyaers</p>";
    return;
  }

  layers.map((layer) => {
    // layer Card
    const card = document.createElement("div");
    card.className = "card-body";
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = layer.name;

    const btn = document.createElement("a");
    btn.className = "btn btn-danger";
    btn.textContent = "Delete";

    // switcher
    const switcher = document.createElement("div");
    switcher.className = "form-check form-switch";
    const switcherInput = document.createElement("input");
    switcherInput.className = "form-check-input";
    switcherInput.type = "checkbox";
    switcherInput.role = "switch";
    switcherInput.id = "switchCheckChecked";
    switcherInput.checked = true;
    const switcherLabel = document.createElement("label");
    switcherLabel.className = "form-check-label";
    switcherLabel.htmlFor = "switchCheckChecked";

    switcher.appendChild(switcherInput);
    switcher.appendChild(switcherLabel);

    card.appendChild(title);
    card.appendChild(btn);
    card.appendChild(switcher);

    layersContainer.appendChild(card);
  });
}

// showLayers();

// function showLayers() {
//   layersContainer.innerHTML = "";

//   if (layers.length === 0) {
//     layersContainer.innerHTML = "<p>No Lyaers</p>";
//     return;
//   }

//   layers.map((layer) => {
//     // layer Card
//     const card = document.createElement("div");
//     card.className = "card-body";
//     const title = document.createElement("h5");
//     title.className = "card-title";
//     title.textContent = layer.name;

//     const btn = document.createElement("a");
//     btn.className = "btn btn-danger";
//     btn.textContent = "Delete";

//     // switcher
//     const switcher = document.createElement("div");
//     switcher.className = "form-check form-switch";
//     const switcherInput = document.createElement("input");
//     switcherInput.className = "form-check-input";
//     switcherInput.type = "checkbox";
//     switcherInput.role = "switch";
//     switcherInput.id = "switchCheckChecked";
//     switcherInput.checked = true;
//     const switcherLabel = document.createElement("label");
//     switcherLabel.className = "form-check-label";
//     switcherLabel.htmlFor = "switchCheckChecked";

//     switcher.appendChild(switcherInput);
//     switcher.appendChild(switcherLabel);

//     card.appendChild(title);
//     card.appendChild(btn);
//     card.appendChild(switcher);

//     layersContainer.appendChild(card);
//   });
// }

// add a zoom to layer funcionality once clicked on a layer card
