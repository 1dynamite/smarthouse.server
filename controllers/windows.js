const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const getAll = async (req, res) => {
  const fsp = fs.promises;
  const rootPath = process.cwd();

  const myDataArray = [];

  for (const i of req.dataFromDB) {
    const pathToImg = path.join(rootPath, i.img);

    const p = fsp
      .readFile(pathToImg, "base64")
      .then((data) => `data:image/jpg;base64,${data}`);

    const myPromises = [p];

    i.windows.forEach((el) => {
      const pathToWindowImg = path.join(rootPath, el);

      const p = fsp
        .readFile(pathToWindowImg, "base64")
        .then((data) => `data:image/jpg;base64,${data}`);

      myPromises.push(p);
    });

    const myArray = await Promise.all(myPromises);

    const myObject = {
      img: myArray.shift(),
      windows: myArray,
    };

    myDataArray.push(myObject);
  }

  const newValues = myDataArray.map((item, index) => ({
    ...req.dataFromDB[index],
    ...item,
  }));

  res.json(newValues);
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
