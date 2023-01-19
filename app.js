"use strict";

//모듈
const express = require('express');
const app = express();

//라우팅
const home = require("./routes/home");

//app setting
app.set("views","./views");
app.set("view engine", "ejs");

app.use("/", home); //use -> 미들웨어 등록 메소드

module.exports = app;

