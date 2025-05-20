const express = require('express');
const router = express.Router();
// const courseController = require('../controllers/courseController');
// const auth = require('../middleware/auth');

// @route   GET api/courses
// @desc    Get all courses
// @access  Private
router.get(
  '/',
  // auth,
  // courseController.getCourses
  (req, res) => {
    res.json({ msg: 'Get all courses route' });
  }
);

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Private
router.get(
  '/:id',
  // auth,
  // courseController.getCourseById
  (req, res) => {
    res.json({ msg: `Get course ${req.params.id} route` });
  }
);

// @route   POST api/courses
// @desc    Create a course
// @access  Private/Admin
router.post(
  '/',
  // auth,
  // courseController.createCourse
  (req, res) => {
    res.json({ msg: 'Create course route' });
  }
);

// @route   PUT api/courses/:id
// @desc    Update a course
// @access  Private/Admin
router.put(
  '/:id',
  // auth,
  // courseController.updateCourse
  (req, res) => {
    res.json({ msg: `Update course ${req.params.id} route` });
  }
);

// @route   DELETE api/courses/:id
// @desc    Delete a course
// @access  Private/Admin
router.delete(
  '/:id',
  // auth,
  // courseController.deleteCourse
  (req, res) => {
    res.json({ msg: `Delete course ${req.params.id} route` });
  }
);

// @route   GET api/courses/:id/modules
// @desc    Get all modules for a course
// @access  Private
router.get(
  '/:id/modules',
  // auth,
  // courseController.getCourseModules
  (req, res) => {
    res.json({ msg: `Get modules for course ${req.params.id} route` });
  }
);

module.exports = router;

