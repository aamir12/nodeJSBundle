const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const moment = require("moment");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
dotenv.config();

const authRoutes = require("./routes/api/authRoutes");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//set view engine
app.set("view engine", "ejs");
//view folder
app.set("views", "views");
// for getting form data: POST,GET
app.use(
  express.urlencoded({
    extended: false,
  })
);

//set static path for public resources
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//set other configuration here

//set values that will be sent to each and every render
app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red);
  server.close(() => process.exit(1));
});
