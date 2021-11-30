const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/movies";

const mongoConnect = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb database");
  })
  .catch((err) => console.log(`Mongodb connection error => ${err}`));

module.exports = mongoConnect;
