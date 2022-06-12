const express = require("express");
const app = express();
const ddTrace = require("dd-trace");

const tracer = require('dd-trace').init({
    profiling: true
});

app.listen(5500, (req,res) => {
    console.log(`Server running on PORT ${process.env.PORT} and received message ${process.env.MESSAGE}`)
})

app.get("/",(req,res) => {
    res.send(process.env.MESSAGE)
});


app.post("/error",(req,res) => {
    return res.status(500).json({
        message: "some error"
    })
})