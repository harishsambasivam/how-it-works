const { Router } = require("express");
const { getUser, addUser } = require("../services/user");
const router = Router();
const logger = require("../utils/logger");

router.get("/:username", async (req, res, next) => {
    try {
        let ip;
        const { username } = req.params;
        const user = await getUser(username);
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { username } = req.body;
        if(!username) throw new Error("username is required");
        const user = await addUser(req.body);
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;
