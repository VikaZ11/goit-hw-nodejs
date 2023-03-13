const express = require("express");

const { validation, ctrlWrapper, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(schemas.joiSchema);
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", authenticate, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
