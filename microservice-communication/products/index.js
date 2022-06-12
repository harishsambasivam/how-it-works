const express = require('express');
const app = express();
const { faker } = require("@faker-js/faker");


const { initLogger } = require('@harishsambasivam/pino-logger-poc');

const { contextMiddleware, correlationMiddleware, logger } = initLogger("development", {
    pretty: true,
    // targetFile: "/Users/harish/Documents/Learnings/nodejs/microservice-communication/logs/pino.log",
    redact: {
        paths: ['message.cardNo'],
        // remove: true,
        censor: '**GDPR COMPLIANT**'
    },
    logProps: {
        service: "products",
        env: "development"
    }
});

app.use(correlationMiddleware());
app.use(contextMiddleware(logger));

app.listen(process.env.PRODUCT_SERVICE_PORT || 4500, () => {
    logger.info(`Server running on PORT ${process.env.PRODUCT_SERVICE_PORT || 4500}`);
})



const childLogger = logger.child({ "module": "stock management","service":"products", "env":"development" });

const createProduct = () => {
    return {
        "name": faker.commerce.productName(),
        "description": faker.commerce.productDescription(),
        "price": faker.commerce.price()
    }
}

app.get("/product/:id", (req, res) => {


    childLogger.info("GET /product/:id");
    try {

        if (req?.query?.productError === "true") {
            throw new Error(
                "product out of stock",
            )
        }

        let data = createProduct();
        childLogger.info(`Created Product: ${JSON.stringify(data)}`);
        return res.status(200).json({
            status: "OK",
            data
        })

    } catch (err) {
        childLogger.error(err);
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