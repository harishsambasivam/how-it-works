const { DataTypes } = require('sequelize');
const connectPostgres = require("../config/database");
const sequelize = connectPostgres();

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "users"
});

sequelize.sync({ alter: true });

module.exports = User;