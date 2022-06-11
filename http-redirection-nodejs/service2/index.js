const express = require("express")
const app = express();

app.use(express.json());

app.listen(9000, () => {
    console.log(`Server is running on PORT 3000`);
});


app.get('/service2', (req,res) => {
    res.status(200).json({
        status: "OK",
        serviceName: "service 2"
    });
});

app.post('/service2',(req,res) => {
    res.status(200).json({
        status: "OK",
        serviceName: "service 2",
        receivedBody: req.body
    });
})