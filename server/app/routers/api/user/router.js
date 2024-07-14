const express = require("express");

const router = express.Router();

const {
  browse,
  readBadgesAndMenus,
  edit,
  add,
  destroy,
} = require("../../../controllers/userActions");

const validateUserSchema = require("../../../middlewares/validateUserSchema");
const hashPassword = require("../../../services/hashPassword");

router.get("/", browse);

router.get("/:id", readBadgesAndMenus);

router.put("/:id", edit);

router.post("/register", validateUserSchema, hashPassword, add);

router.delete("/:id", destroy);

module.exports = router;
