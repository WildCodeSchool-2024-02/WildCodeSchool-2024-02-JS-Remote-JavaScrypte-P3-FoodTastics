const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/recipeLabelActions");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);
router.delete("/:id", destroy);

module.exports = router;
