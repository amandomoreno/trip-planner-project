const express = require('express')
const router = express.Router()
const activitiesCtrl = require('../controllers/activities')

router.get('/new', isLoggedIn, activitiesCtrl.new)
router.post('/', isLoggedIn, activitiesCtrl.create)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router