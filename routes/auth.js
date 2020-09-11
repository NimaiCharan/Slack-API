var express = require("express");
var router = express.Router();
const { read, write } = require("../controllers/auth");
router.get("/read", read);

router.post("/write", write);

module.exports = router;
