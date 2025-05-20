const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
// const userController = require('../controllers/userController');
// const auth = require('../middleware/auth');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
  ],
  // userController.registerUser
  (req, res) => {
    res.json({ msg: 'Register user route' });
  }
);

// @route   GET api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get(
  '/',
  // auth,
  // userController.getUsers
  (req, res) => {
    res.json({ msg: 'Get all users route' });
  }
);

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get(
  '/:id',
  // auth,
  // userController.getUserById
  (req, res) => {
    res.json({ msg: `Get user ${req.params.id} route` });
  }
);

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put(
  '/:id',
  // auth,
  // userController.updateUser
  (req, res) => {
    res.json({ msg: `Update user ${req.params.id} route` });
  }
);

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete(
  '/:id',
  // auth,
  // userController.deleteUser
  (req, res) => {
    res.json({ msg: `Delete user ${req.params.id} route` });
  }
);

module.exports = router;

