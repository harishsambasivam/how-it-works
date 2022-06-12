const express = require('express');
const app = express();
const uuid = require('uuid');
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
        service: "payments",
        env: "development"
    }
});

app.use(correlationMiddleware());
app.use(contextMiddleware(logger));

app.listen(process.env.PAYMENT_SERVICE_PORT || 5500, () => {
    logger.info(`Server running on PORT ${process.env.PAYMENT_SERVICE_PORT || 5500}`);
})

app.use(express.json());

const childLogger = logger.child({"module":"UPI transaction", "service":"payments", "env":"development"});

app.post("/pay", (req, res) => {
    try {

        childLogger.info("POST /pay");

        if (req?.query?.paymentError === "true") {
            throw new Error("UPI not valid");
        }

        const { products } = req.body;

        // calculate the total amount
        const total = products.reduce((sum, { price }) => sum + parseInt(price), 0);

        let statusCode, data;
        statusCode = 200;
        data = {
            transactionId: uuid.v4(),
            accountName: faker.finance.accountName(),
            cardNumber: faker.finance.creditCardNumber(),
            cardIssuer: faker.finance.creditCardIssuer(),
            cvv: faker.finance.creditCardCVV(),
            total
        };
        childLogger.info(`Data: ${JSON.stringify(data)}`);
        return res.status(statusCode).json({
            status: "OK",
            data: data
        })
    }
    catch (err) {
        childLogger.error(err);
        const response = {
            statusCode: 200,
            status: "ERROR",
            code: err.message ?  2001 : 400,
            message: err.message || "something went wrong",
            more_info: "http://ecommerc.errors.info/" + err.statusCode || null
        };
        childLogger.info(`Response: ${JSON.stringify(response)}`);
        return res.status(200).json(response)
    }
})