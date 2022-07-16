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
    account_number : {
        type: DataTypes.TEXT,
        allowNull: false
      },
    pin: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    credit_card_number: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cvv: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    credit_card_holder : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wallet_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PAN:{
        type: DataTypes.STRING,
        allowNull: false
    },
    aadhar_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    voter_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driving_license_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passport_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: "users"
});

// sequelize.sync({ force: true });

module.exports = User;
