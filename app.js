// Creating a Node Server
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views"); // by default it is views, use only if the html files are in a folder with name other than views

app.use(bodyParser.urlencoded({ extended: false })); // for parsing the incoming req body
app.use(express.static(path.join(__dirname, "public"))); //middleware for serving files statically (stylesheet in shop.html)

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
