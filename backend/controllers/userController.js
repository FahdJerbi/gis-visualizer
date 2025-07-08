const getAllLayers = (req, res) => {
  res.send("get all layers route");
};

const fetchOSMLayers = (req, res) => {
  res.send("fetch OSM layers route");
};

const deleteAllLayers = (req, res) => {
  res.send("delete all layers route");
};

const deleteLayer = (req, res) => {
  res.send("delete layer route");
};

module.exports = { getAllLayers, fetchOSMLayers, deleteAllLayers, deleteLayer };
