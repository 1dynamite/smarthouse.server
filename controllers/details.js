const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const getOne = async (req, res) => {
  const fsp = fs.promises;
  const rootPath = process.cwd();

  const myPromises = [];

  req.detailOne.cards.forEach((element) => {
    const pathToImg = path.join(rootPath, element.img);

    const p = fsp
      .readFile(pathToImg, "base64")
      .then((data) => `data:image/jpg;base64,${data}`);

    myPromises.push(p);
  });

  const myArray = await Promise.all(myPromises);

  req.detailOne.cards.forEach((element, index) => {
    element.img = myArray[index];
  });

  res.json(req.detailOne);
};

const itemByID = async (req, res, next, cid) => {
  const col = mongoose.connection.db.collection("details");

  col.find({ cid: new mongoose.Types.ObjectId(cid) }).toArray((err, data) => {
    if (err) res.status(400).end("Ooops... :(");
    else {
      if (data.length !== 0) req.detailOne = data[0];
      next();
    }
  });
};

module.exports = {
  getOne,
  itemByID,
};
