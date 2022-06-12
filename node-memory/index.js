const express = require("express");
const app = express();

app.listen(3000);

app.get("/",(req,res) => {
    res.status(201).json({"data":"hello world"});
})

app.use((req,res,next) => {
    console.log("######");
   console.log(res.statusCode);
//    console.log(req);
//    console.log(res);
   next();
})