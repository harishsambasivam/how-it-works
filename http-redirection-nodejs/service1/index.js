const express = require("express")
const app = express();

app.use(express.json());

app.listen(8000, () => {
    console.log(`Server is running on PORT 3000`);
});

app.get('/service1', (req,res) => {
    res.redirect(307, "http://localhost:9000/service2");
});

app.post('/service1',(req,res) => {
    res.redirect(307, "http://localhost:9000/service2");
})