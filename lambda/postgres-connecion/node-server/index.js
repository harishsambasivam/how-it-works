const express = require("express");
const app = express();
require('dotenv').config();
const sequelizeConnection = require("./dbConnection");
const createUser = require("./User");
const logger = console;

app.listen(3000, async (req,res) => {
    await sequelizeConnection;
    logger.info("Server started on port 3000");
})

app.get("/user/create", async (req,res) => {
   const user = await createUser();
   res.status(200).json(user);
})


app.use((err,req,res,next) => {
    res.status(500).json({
        message: err.message
    })
})

