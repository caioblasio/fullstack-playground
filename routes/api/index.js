const router = require('express').Router();

router.use('/', require('./users'));
router.use('/projects', require('./projects'));

module.exports = router;