const express = require('express');
const router = express.Router();

router.use('/', require('./auth') )
router.use('/', require('./swagger'));
router.use('/recipes', require('./recipes'))

// Test for the OAuth with Google. These routes all work and allow you to be 
// authenticated before being allowed to access them.



module.exports = router;