const { DataTypes } = require('sequelize');
const User = require("./user");
const Product = require("./product");
const connectPostgres = require("../config/database");
const sequelize = connectPostgres();

const Order = sequelize.define('Order', {
    orderedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: "orders"
});

Order.belongsTo(User);


const OrderedProducts = sequelize.define('OrderedProducts', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT
    }
}, {
    tableName: "ordered_products"
});


OrderedProducts.belongsTo(Product);
OrderedProducts.belongsTo(Order);


module.exports = { Order, OrderedProducts };