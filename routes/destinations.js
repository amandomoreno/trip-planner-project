const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations')

/* GET users listing. */
router.get('/new', isLoggedIn, destinationsCtrl.new)
router.post('/', isLoggedIn, destinationsCtrl.create)
router.get('/', destinationsCtrl.index)
router.get('/:id', isLoggedIn, destinationsCtrl.show)
router.put('/:id', isLoggedIn, destinationsCtrl.update)
router.delete('/:id', isLoggedIn, destinationsCtrl.delete)
router.post('/:id/activities', isLoggedIn, destinationsCtrl.addActivity)



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
module.exports = router;