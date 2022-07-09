const pgPromise = require("./dbConnection");
const { DataTypes } = require("sequelize");
require("dotenv").config();
const { faker } =  require('@faker-js/faker');



module.exports = async (event, context) => {
    try {

        const sequelize = await pgPromise;

        const User = sequelize.define('User', {
            firstname: {
                type: DataTypes.STRING
            },
            lastname: {
                type: DataTypes.STRING
            }
        }, {
            freezeTableName: true
        });

        await User.sync({alter:true});
        const user = await User.create({ firstname:faker.name.firstName(), lastname:faker.name.lastName() });
        return user;
    } catch (err) {
        console.log(err);
        return err;
    }
};
