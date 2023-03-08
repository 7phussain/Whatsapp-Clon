const express = require("express");
const router = express.Router();
const {loginController} = require("../controllers/auth")

router.post('loginFrom',loginController);
module.exports = router;
