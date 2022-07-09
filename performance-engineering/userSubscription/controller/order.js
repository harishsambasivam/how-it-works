const { Router } = require("express");
const { getOrders, addOrder } = require("../services/order");
const router = Router();

router.get("/", (req,res,next) => {
    getOrders();
});

router.post("/", (req,res,next) => {
    addOrder();
});

module.exports = router;