const cors = require("cors");
const express = require("express");
const formData = require("express-form-data");
const morgan = require("morgan");

const portExpress = 9000;
const app = express();


function User(name) {
  this.name = name;
}

function BBDD() {
  this.users = [];

  this.addUser = (user) => {
    this.users.push(user);
  };
}

const memoBBDD = new BBDD();
app.use(function (req, res, next) {
  req.memo = memoBBDD;
  next();
});

//config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());
app.use(cors());
app.use(morgan("dev"));

app.listen(portExpress, () => {
  console.log(`🚀 ~ ${port}`);
});

app.post("/user", ({ body, memo }, res) => {
  const user = new User(body);
  memo.addUser(user);

  res.status(201).end();
});

app.get("/users", ({ memo }, res) => {
  res.status(200).json(memo.users).end();
});

