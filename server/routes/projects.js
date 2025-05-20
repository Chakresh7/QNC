const express = require('express');
const router = express.Router();
// const projectController = require('../controllers/projectController');
// const auth = require('../middleware/auth');

// @route   GET api/projects
// @desc    Get all projects
// @access  Private
router.get(
  '/',
  // auth,
  // projectController.getProjects
  (req, res) => {
    res.json({ msg: 'Get all projects route' });
  }
);

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get(
  '/:id',
  // auth,
  // projectController.getProjectById
  (req, res) => {
    res.json({ msg: `Get project ${req.params.id} route` });
  }
);

// @route   POST api/projects
// @desc    Create a project
// @access  Private
router.post(
  '/',
  // auth,
  // projectController.createProject
  (req, res) => {
    res.json({ msg: 'Create project route' });
  }
);

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private
router.put(
  '/:id',
  // auth,
  // projectController.updateProject
  (req, res) => {
    res.json({ msg: `Update project ${req.params.id} route` });
  }
);

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete(
  '/:id',
  // auth,
  // projectController.deleteProject
  (req, res) => {
    res.json({ msg: `Delete project ${req.params.id} route` });
  }
);

// @route   POST api/projects/:id/submit
// @desc    Submit a project for review
// @access  Private
router.post(
  '/:id/submit',
  // auth,
  // projectController.submitProject
  (req, res) => {
    res.json({ msg: `Submit project ${req.params.id} route` });
  }
);

// @route   POST api/projects/:id/feedback
// @desc    Provide feedback on a project
// @access  Private/Mentor
router.post(
  '/:id/feedback',
  // auth,
  // projectController.provideFeedback
  (req, res) => {
    res.json({ msg: `Provide feedback for project ${req.params.id} route` });
  }
);

module.exports = router;

