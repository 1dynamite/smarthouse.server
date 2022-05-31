const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const getAll = (req, res) => {
  const fsp = fs.promises;
  const rootPath = process.cwd();

  const myPromises = [];

  for (const i of req.dataFromDB) {
    const myPath = path.join(rootPath, i.img);
    myPromises.push(fsp.readFile(myPath, "base64"));
  }

  Promise.all(myPromises).then((values) => {
    const newValues = values.map((item, index) => ({
      ...req.dataFromDB[index],
      img: `data:image/jpg;base64,${item}`,
    }));

    res.json(newValues);
  });
};

const getDataFromDB = (req, res, next) => {
  const col = mongoose.connection.db.collection("window_cards");

  col.find({}).toArray((err, data) => {
    if (err) res.status(400).end("Ooops... :(");
    else {
      req.dataFromDB = data;
      next();
    }
  });
};

module.exports = {
  getAll,
  getDataFromDB,
};
