
const express = require("express");

const router = express.Router();

const {browse, read, add, edit, destroy} = require ("../../../controllers/ingredientActions");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);
router.put("/:id", edit);
router.delete("/:id", destroy);

module.exports =router; 