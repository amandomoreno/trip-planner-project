const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations')

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("index", { title: "Home Page", user: req.user ? req.user : null });
});

module.exports = router;
