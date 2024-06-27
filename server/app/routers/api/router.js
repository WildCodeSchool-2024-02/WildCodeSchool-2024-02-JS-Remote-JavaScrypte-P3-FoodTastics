const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const menuRouter = require("./menu/router");
const commentRouter = require("./comment/router");
const recipesRouter = require("./recipe/router");
const labelsRouter = require("./labels/router");

router.use("/user", userRouter);
router.use("/menu", menuRouter);
router.use("/comment", commentRouter);
router.use("/recipe", recipesRouter);
router.use("/labels", labelsRouter);

/* ************************************************************************* */

module.exports = router;
