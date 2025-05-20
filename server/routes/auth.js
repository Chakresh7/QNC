const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
// const authController = require('../controllers/authController');
// const auth = require('../middleware/auth');

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  // authController.loginUser
  (req, res) => {
    res.json({ msg: 'Login route' });
  }
);

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get(
  '/',
  // auth,
  // authController.getUser
  (req, res) => {
    res.json({ msg: 'Get user route' });
  }
);

module.exports = router;

