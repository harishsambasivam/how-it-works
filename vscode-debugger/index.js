const express = require("express");
const app = express();
const foo = require("./functions");

app.use(express.json());

app.listen(3000);

app.get("/", (req,res) => {
    console.log("Invoking controller");
    const data = foo(req) || "data";
    res.send(data);
});