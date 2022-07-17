require("dotenv").config();
const connectPostgres = require("./config/database");
const connection = connectPostgres;
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const userRouter = require("./controller/user");
const productRouter = require("./controller/product");
const ordersRouter = require("./controller/order");
const PORT = 3000;
const tracer = require('dd-trace');

tracer.init({
    runtimeMetrics: true
});

app.set('trust proxy', 2);


app.listen(PORT, async () => {
    logger.info(`Service started on PORT ${PORT}`);
});

app.get("/", (req,res) => {
    console.log("Healthcheck");
    res.status(200).send("Service is up and running");
})

app.use(express.json())

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/orders", ordersRouter);



app.use((err,req,res,next) => {
    logger.error(err);
    res.status(500).json({
        status: "error",
        message: err.message
    })
})
