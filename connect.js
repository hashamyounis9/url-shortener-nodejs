const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
  if (!url) {
    return {};
  }
  mongoose
    .connect(url)
    .catch((err) => console.log("Couldn't connect: ", err))
    .then(() => console.log("Connect Successfuly!"));
}

module.exports = connectToMongoDB;
