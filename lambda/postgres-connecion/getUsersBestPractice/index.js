
const connectPostgres = require("./dbConnection");
const { DataTypes } = require("sequelize");
const postgresPromise = connectPostgres(process.env.PG_NUCLEUS_URI);
const { faker } =  require('@faker-js/faker');

exports.handler = async (event, context) => {
    let response;
    try {
        const sequelize = await postgresPromise;
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
        console.log(user.toJSON());
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: user,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
    return response;
};
