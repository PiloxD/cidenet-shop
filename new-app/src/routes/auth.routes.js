const { Router } = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = Router();



router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);



module.exports = router;
