const { Router } = require("express");
const { getProduct, addProduct } = require("../services/product");
const router = Router();

router.get("/", (req,res,next) => {
    getProduct();
});

router.post("/", (req,res,next) => {
    addProduct();
});

module.exports = router;
