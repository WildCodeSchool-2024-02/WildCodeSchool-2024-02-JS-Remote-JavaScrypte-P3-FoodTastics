const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const menuRouter = require("./menu/router");

router.use("/user", userRouter);
router.use("/menu", menuRouter);

/* ************************************************************************* */

module.exports = router;
