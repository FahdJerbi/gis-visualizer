const express = require("express");
const router = express.Router();
const {
  getAllLayers,
  fetchOSMLayers,
  deleteLayer,
  deleteAllLayers,
} = require("../controllers/userController");

router
  .route("/data")
  .get(getAllLayers)
  .post(fetchOSMLayers)
  .delete(deleteLayer)
  .delete(deleteAllLayers);

module.exports = router;
