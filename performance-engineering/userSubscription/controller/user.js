const { Router } = require("express");
const { getUser, addUser } = require("../services/user");
const router = Router();

router.get("/", (req,res,next) => {
    getUser();
});

router.post("/", (req,res,next) => {
    addUser();
});

module.exports = router;