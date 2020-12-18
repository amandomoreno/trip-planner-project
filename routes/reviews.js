const express = require('express')
const router = express.Router()
const reviewsCtrl = require('../controllers/reviews')

router.post('/destinations/:id/reviews', isLoggedIn, reviewsCtrl.create)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router 