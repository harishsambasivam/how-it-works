const logger = require("../utils/logger");
const Product = require("../models/product");

module.exports.getProduct = () => {
    logger.info("Get Product");
};
module.exports.addProduct = () => {
    logger.info("Add Product");
};