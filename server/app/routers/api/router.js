const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const recipesRouter = require("./recipe/router");

router.use("/recipe", recipesRouter);

/* ************************************************************************* */

module.exports = router;
