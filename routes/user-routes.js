const express = require('express');
const router = express.Router();
const {getAllUser,signupUser,loginUser} = require('../controllers/user-controller');

router.get('/',getAllUser);

router.post('/signup',signupUser)

router.post('/login',loginUser)

module.exports = router;