const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const {browse, read, add} = require("../../../controllers/labelActions");

const validateLabelSchema = require("../../../middlewares/validateLabelSchema")

router.get("/",browse);
router.get("/:id",read);


router.post("/", validateLabelSchema, add);
/* ************************************************************************* */

module.exports = router;
