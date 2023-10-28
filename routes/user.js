const express = require('express');

const router = express.Router();
const auth_controller = require('../controllers/auth_controller');
const user_controller = require('../controllers/user_controller');
const authentication = require('../middlewares/auth');

router.post('/signup', auth_controller.signup);
router.post('/login', auth_controller.login);
router.get('/logout', auth_controller.logout);
router.put('/:id/change-email', authentication,  user_controller.changeEmail);
router.put('/:id/change-password', authentication ,user_controller.changePassword);



module.exports = router;