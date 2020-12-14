const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations')

/* GET users listing. */
router.get('/new', destinationsCtrl.new)
router.post('/', destinationsCtrl.create)



module.exports = router;