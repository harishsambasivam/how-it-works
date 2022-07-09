const logger = require("../utils/logger");
const User = require("../models/user");

module.exports.addUser = () => {
    logger.info("Add User");
};
module.exports.getUser = () => {
    logger.info("Get User");
};