const express = require('express');
const user_login = require('../controllers/user_login');
const user_validation = require('../controllers/user_validation')
const save_form_data = require('../controllers/study_form_data');
const router = express.Router();

router.post('/save_user_data', user_login.user_login);
router.post('/get_user_validation', user_validation.authenticateUser);
router.post('/save_form_data', save_form_data.study_form_data)
module.exports = router;