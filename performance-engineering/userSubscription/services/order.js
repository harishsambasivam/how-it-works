const logger = require("../utils/logger")
const { Order, OrderedProducts } = require("../models/order");


module.exports.getOrder = () => {
    logger.info("Get Order")
}
module.exports.addOrder = () => {
    logger.info("Add Order");
}