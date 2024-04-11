const {  createUser,login } = require('./userController');

const router = require('express').Router();

const { checkToken } = require("./tokenValidation");

router.post("/signup",createUser);

router.post("/login",login);

module.exports = router;