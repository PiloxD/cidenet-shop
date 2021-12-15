const { Router } = require('express');
import * as userControl from '../controllers/users.controller'

const router = Router();

router.get('/users');

export default router;
