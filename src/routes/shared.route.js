const router = require('express').Router();
const { share } = require('../controllers/shared.controller');

router.get('/ink/:script_', share);

module.exports = router;