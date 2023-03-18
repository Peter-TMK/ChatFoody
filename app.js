const express = require("express");
const path = require("path");
const app = express();
const sessionMW = require("./config/sessionMW");

app.use(express.static(path.join(__dirname, "public")));

app.use(sessionMW);
app.use((err, req, res, next)=>{
    console.log(err.stack)
})

module.exports = app;
