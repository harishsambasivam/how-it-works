const express = require("express");
const app = express();
const userSubscriptionRouter = require("./router");
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Service started on PORT ${PORT}`);
});

app.use("/subscribe", userSubscriptionRouter);