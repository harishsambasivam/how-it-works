const logger = require("../utils/logger");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 15;

module.exports.addUser = async (userData) => {
    logger.info("Add User");
    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userData.password = hashedPassword;
    const user = await User.create(userData);
    return user;
};
module.exports.getUser = async (username) => {
    logger.info("Get User");
    console.log(username);
    const user = await User.findOne({ where: { username : username } });
    return user;
};