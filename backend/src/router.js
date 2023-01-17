const express = require("express");

const router = express.Router();

const exitSheetMiddleware = require("./middlewares/exitSheetMiddleware");
const exitSheetControllers = require("./controllers/exitSheetControllers");

router.get("/", exitSheetControllers.getRows);
router.post(
  "/",

  exitSheetMiddleware.validadeField,
  exitSheetControllers.createRows
);

module.exports = router;
