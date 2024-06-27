const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const commentRouter = require("./comment/router");
const recipesRouter = require("./recipe/router");

router.use("/comment", commentRouter);
router.use("/recipe", recipesRouter);

/* ************************************************************************* */

module.exports = router;
