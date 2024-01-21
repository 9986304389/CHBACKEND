const express = require('express');
const user_login = require('../controllers/user_login');
const user_validation = require('../controllers/user_validation')

const router = express.Router();

router.post('/save_user_data', user_login.user_login);
router.post('/get_user_validation', user_validation.authenticateUser);

module.exports = router;