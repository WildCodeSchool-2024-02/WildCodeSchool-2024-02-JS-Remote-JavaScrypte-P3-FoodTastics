const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/ingredientActions");

const validateIngredientSchema = require("../../../middlewares/validateIngredientSchema");

router.get("/", browse);
router.get("/:id", read);
router.post("/", validateIngredientSchema, add);
router.put("/:id", edit);
router.delete("/:id", destroy);

module.exports = router;
