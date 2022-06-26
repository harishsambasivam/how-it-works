const { Router } = require("express");
const router = Router();
const { getUser, addSubscription, updateSubscription, deleteSubscription} = require("./controller");

router.get("/", getUser);
router.post("/",addSubscription);
router.put("/",updateSubscription);
router.delete("/",deleteSubscription);

module.exports = router;