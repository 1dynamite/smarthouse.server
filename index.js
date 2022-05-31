const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect("mongodb://localhost:27017/smarthouse")
  .catch(() =>
    console.log(
      `unable to connect to database: ${"mongodb://localhost:27017/smarthouse"}`
    )
  );

mongoose.connection.on("error", () => {
  console.log("database connection error");
});

app.listen(3001, () => {
  console.log(`Application is running on http://localhost:${3001}/`);
});
