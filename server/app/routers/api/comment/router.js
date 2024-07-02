const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/commentActions");

const validateCommentSchema = require("../../../middlewares/validateCommentSchema");

router.get("/", browse);
router.get("/:id", read);
router.post("/", validateCommentSchema, add);
router.put("/:id", edit);
router.delete("/:id", destroy);

module.exports = router;
