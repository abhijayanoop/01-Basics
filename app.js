// Creating a Node Server
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views"); // by default it is views, use only if the html files are in a folder with name other than views

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false })); // for parsing the incoming req body
app.use(express.static(path.join(__dirname, "public"))); //middleware for serving files statically (stylesheet in shop.html)

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//creating associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then((res) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Abhijay", email: "abhijay@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
