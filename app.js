const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

app.use("/api", routes);

module.exports = app;
