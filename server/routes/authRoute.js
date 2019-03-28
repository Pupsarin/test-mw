const express = require('express');
const router = express.Router();
const { signInUp } = require('../handlers/auth');

router.post('/', signInUp);

module.exports = router;