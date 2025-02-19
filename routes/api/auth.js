const express = require("express");

const { auth: ctrl } = require("../../controllers");

const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(schemas.emailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.post("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
