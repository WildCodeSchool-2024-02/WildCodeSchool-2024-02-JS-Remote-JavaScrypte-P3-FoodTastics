const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const commentRouter = require("./comment/router");

router.use("/comment", commentRouter);
/* ************************************************************************* */

module.exports = router;
