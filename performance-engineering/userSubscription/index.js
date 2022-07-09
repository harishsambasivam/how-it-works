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

app.listen(PORT, async () => {
    logger.info(`Service started on PORT ${PORT}`);
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/orders", ordersRouter);