const express = require('express');
const app = express();
const { faker } = require("@faker-js/faker");
const pino = require("pino");

const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  });

app.listen(process.env.PRODUCT_SERVICE_PORT || 4500, () => {
    logger.info(`Server running on PORT ${process.env.PRODUCT_SERVICE_PORT || 4500}`);
})

const createProduct = () => {
    return {
        "name": faker.commerce.productName(),
        "description": faker.commerce.productDescription(),
        "price": faker.commerce.price()
    }
}

app.get("/product/:id", (req, res) => {

    logger.info( { requestId: req.headers["x-byjus-correlation-id"]},"GET /product/:id");
    try {

        if (req?.query?.productError === "true") {
            throw new Error(
                "product out of stock",
            )
        }

        let data = createProduct();
        logger.info( { requestId: req.headers["x-byjus-correlation-id"]},`Created Product: ${JSON.stringify(data)}`);
        return res.status(200).json({
            status: "OK",
            data
        })

    } catch (err) {
        logger.error( { requestId: req.headers["x-byjus-correlation-id"]}, err);
        const response = {
            statusCode: 200,
            status: "ERROR",
            code: err.message ?  2001 : 400,
            message: err.message || "something went wrong",
            more_info: "http://ecommerc.errors.info/" + err.statusCode || null
        };
        return res.status(200).json(response);

    }
})