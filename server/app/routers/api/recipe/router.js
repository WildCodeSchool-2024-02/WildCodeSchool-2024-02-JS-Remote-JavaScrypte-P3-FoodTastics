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

const validateRecipeSchema = require("../../../middlewares/validateRecipeSchema");

router.get("/", browse);

router.get("/:id", read);

router.put("/:id", edit);

router.post("/", validateRecipeSchema, add);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
