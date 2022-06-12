const app = require('express')();

app.listen(3000);

app.get("/",(req,res) => {
    console.log(JSON.stringify(req.headers,null,2));
    res.send("OK");
})