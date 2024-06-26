const express = require("express");

const router = express.Router();

const {browse, read, add, edit, destroy} = require ("../../../controllers/commentActions");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);
router.put("/", edit);
router.delete("/", destroy);

module.exports =router; 