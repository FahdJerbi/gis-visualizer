import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import osmtogeojson from "osmtogeojson";

// get bbox bounds
const getMyData = (map) => {
  map.on("pm:create", async (e) => {
    // get bounds
    const bounds = e.layer._bounds;
    const bound_NE = e.layer._bounds._northEast;
    const bound_SW = e.layer._bounds._southWest;
    console.log("create event:", bounds);
    console.log("NE coord:", bound_NE);
    console.log("SW coord:", bound_SW);

    // fetch the data
    const myData = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body:
        "data=" +
        encodeURIComponent(`
          [out:json][timeout:100];
          (way[highway]
            (
              ${bound_SW.lat},
              ${bound_SW.lng},
              ${bound_NE.lat},
              ${bound_NE.lng}
            );
          );
            out body;
            >;
            out skel qt;
          `),
    })
      .then((myData) => myData.json())
      .catch((error) => console.log(error));

    const convertMyData = osmtogeojson(myData);

    L.geoJSON(convertMyData).addTo(map);
  });
};

export default getMyData;
