var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const expressLayout = require("express-ejs-layouts");
const cors = require("cors");
const connectDB = require("./app_api/models/db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const coffeeRouter = require("./app_api/routes/coffee");
const productRouter = require("./app_api/routes/product");
const articleRouter = require("./app_api/routes/article");
const recipeRouter = require("./app_api/routes/recipe");

const authRouter = require("./app_api/routes/auth");

require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayout);
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/coffee", coffeeRouter);
app.use("/api/product", productRouter);
app.use("/api/article", articleRouter);
app.use("/api/recipe", recipeRouter);

app.use("/api/auth", authRouter);

// connect to mongoDB
connectDB();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
