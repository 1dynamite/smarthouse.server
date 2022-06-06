const express = require("express");
const windows = require("../controllers/windows");
const welcomeScreen = require("../controllers/welcomeScreen");
const details = require("../controllers/details");

const router = express.Router();

router.get(
  "/welcome-screen",
  welcomeScreen.getDataFromDB,
  welcomeScreen.getAll
);
router.get("/windows", windows.getDataFromDB, windows.getAll);
router.get("/details/:id", details.getOne);

router.param("id", details.itemByID);

module.exports = router;
