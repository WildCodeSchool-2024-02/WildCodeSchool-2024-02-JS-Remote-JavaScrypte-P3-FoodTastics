const express = require("express");

const router = express.Router();

const {
  create,
  readAll,
  read,
  update,
  destroy,
} = require("../../../controllers/badgeActions");

const validateBadgeSchema = require("../../../middlewares/validateBadgeSchema");

router.get("/", readAll);
router.get("/:id", read);
router.put("/:id", update);
router.post("/", validateBadgeSchema, create);
router.delete("/:id", destroy);

module.exports = router;
