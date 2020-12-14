const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/index",
    failureRedirect: "/auth/google",
  })
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/index");
});

module.exports = router;
