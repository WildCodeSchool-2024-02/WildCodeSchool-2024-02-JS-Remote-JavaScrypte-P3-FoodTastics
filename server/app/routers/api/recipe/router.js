const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/recipeActions");

router.get("/", browse);

router.get("/:id", read);

router.put("/:id", edit);

router.post("/", add);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
