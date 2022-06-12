// const tracer = require('dd-trace').init({
//     service: "microservice-poc",
//     env: 'development'
// });

const express = require('express');
const app = express();
const axios = require('axios');

const { initLogger } = require('@harishsambasivam/pino-logger-poc');

const { contextMiddleware, correlationMiddleware, logger, httpLogger } = initLogger("development", {
    pretty: true,
    // targetFile: "/Users/harish/Documents/Learnings/nodejs/microservice-communication/logs/pino.log",
    redact: {
        paths: ['message.cardNo'],
        // remove: true,
        censor: '**GDPR COMPLIANT**'
    },
    logProps: {
        service: "cart",
        env: "development"
    }
});

// logger.setLevel('error');

app.use(correlationMiddleware([]));
app.use(contextMiddleware(logger));
app.use(httpLogger(logger));

app.use(express.json());

app.listen(process.env.CART_SERVICE_PORT || 3500, () => {
    logger.info(`Server running on PORT ${process.env.CART_SERVICE_PORT || 3500}`);
})

// attaching the correlation id to outgoing http requests
axios.interceptors.request.use(function (config) {
    config.headers['x-byjus-request-trace-id'] = logger.getRequestId();
    return config;
});



const childLogger = logger.child({"module":"checkout","service":"cart", "env":"development"});


app.post("/cart/checkout/:numberOfProducts", async (req, res) => {

    childLogger.info("POST /cart/checkout/:numberOfProducts");

    try {
        const products = [];
        const { numberOfProducts } = req.params;
        const productError = req.query.productError ? true : false;
        const paymentError = req.query.paymentError ? true : false;

        // Generate products using product service
        for (let i = 0; i < numberOfProducts; i++) {
            const productRes = await axios.get(`http://localhost:${process.env.PRODUCT_SERVICE_PORT}/product/1?productError=${productError}`).catch(err => {
                throw new Error(err.message);
            });

            if( productRes?.data?.status === "OK") {
                products.push(productRes?.data?.data);
            } else {
                throw new Error(productRes?.data?.message);
            }
        }

        const resp = await axios.post(`http://localhost:${process.env.PAYMENT_SERVICE_PORT}/pay?paymentError=${paymentError}`, {
            products: products
        }).catch(err => {
            throw new Error(err.message);
        });

        if(resp?.data?.status === "OK") {
            return res.status(200).json({
                status: "success",
                data: resp?.data?.data
            })
        } else {
            throw new Error(resp?.data?.message);
        }

    } catch (err) {
        childLogger.error(err);
        const response = {
            statusCode: err.statusCode || 200,
            status: "ERROR",
            code: err.errorCode || undefined,
            message: err.message || "something went wrong",
            more_info: err.statusCode ? "http://ecommerc.errors.info/" + err.statusCode : undefined
        };
        return res.status(200).json(response);
    }
});