const express = require("express");

const router = express.Router();

const {
  create,
  readAll,
  read,
  update,
  destroy,
} = require("../../../controllers/badgeActions");

router.post("/", create);
router.get("/", readAll);
router.get("/:id", read);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
