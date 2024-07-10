const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const { browse, read, add } = require("../../../controllers/labelActions");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);
/* ************************************************************************* */

module.exports = router;
