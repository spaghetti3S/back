const express = require("express");
const Router = require("./src/routes/router");

const app = express();

app.use(Router);

app.get("/", (req, res) => res.send("Express Lambda Example Server"));

module.exports = app;
