const { Router } = require('express');
const authController = require('../controllers/authController.js');

const router = Router();

router.get('/login', authController.login_get);
router.get('/signup', authController.signup_get);
router.post('/login', authController.login_post);
router.post('/signup', authController.signup_post);
router.get('/logout', authController.logout_get);
router.get('/anonymous', authController.anonymous_login);

module.exports = router;