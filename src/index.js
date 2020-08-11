const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
var cookieParser = require("cookie-parser");

const app = express();

require("./plugins");

app.set("port", process.env.PORT || 5000);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes"));

app.listen(app.get("port"));
