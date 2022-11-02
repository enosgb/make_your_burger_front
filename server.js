const express = require("express");
const path = require("path");
const serverStatic = require("serve-static");

const app = express();

app.use(serverStatic(path.join(__dirname, "dist")));

const port = process.env.PORT || 3000;
app.listen(port);
console.log("app vue started in port " + port);
