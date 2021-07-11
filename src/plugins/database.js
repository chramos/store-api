const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:Abcd1234@cluster0.6gy2a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB database connected");
}).on("error", (err) => {
  console.log(err);
});

module.exports = mongoose;
