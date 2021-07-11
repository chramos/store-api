const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://chramos:dG5TzMtuhztyNJG3@cluster0.6gy2a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB database connected");
}).on("error", (err) => {
  console.log(err);
});

module.exports = mongoose;
