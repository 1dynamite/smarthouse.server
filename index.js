const mongoose = require("mongoose");
const app = require("./app");

const URL =
  "mongodb+srv://shoxa98:V-_V9u-6*2X6bF%40@cluster0.cr3ur.mongodb.net/smarthouse?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .catch(() => console.log(`unable to connect to database: ${URL}`));

mongoose.connection.on("error", () => {
  console.log("database connection error");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Application is running on http://ip-address:${process.env.PORT}/`
  );
});
