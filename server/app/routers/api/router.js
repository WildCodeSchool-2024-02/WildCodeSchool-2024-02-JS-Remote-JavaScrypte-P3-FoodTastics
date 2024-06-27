const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const commentRouter = require("./comment/router");
const recipesRouter = require("./recipe/router");
const labelsRouter = require("./labels/router");
const badgeRouter = require("./badges/router");

router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/recipe", recipesRouter);
router.use("/labels", labelsRouter);
router.use("/badges", badgeRouter);

/* ************************************************************************* */

module.exports = router;
