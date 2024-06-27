const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const commentRouter = require("./comment/router");

router.use("/user", userRouter);
router.use("/comment", commentRouter);
/* ************************************************************************* */

module.exports = router;
