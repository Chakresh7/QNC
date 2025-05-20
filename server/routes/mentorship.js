const express = require('express');
const router = express.Router();
// const mentorshipController = require('../controllers/mentorshipController');
// const auth = require('../middleware/auth');

// @route   GET api/mentorship/mentors
// @desc    Get all mentors
// @access  Private/Admin
router.get(
  '/mentors',
  // auth,
  // mentorshipController.getMentors
  (req, res) => {
    res.json({ msg: 'Get all mentors route' });
  }
);

// @route   GET api/mentorship/students
// @desc    Get all students
// @access  Private/Admin or Mentor
router.get(
  '/students',
  // auth,
  // mentorshipController.getStudents
  (req, res) => {
    res.json({ msg: 'Get all students route' });
  }
);

// @route   GET api/mentorship/mentor/:id/students
// @desc    Get all students for a mentor
// @access  Private/Mentor
router.get(
  '/mentor/:id/students',
  // auth,
  // mentorshipController.getMentorStudents
  (req, res) => {
    res.json({ msg: `Get students for mentor ${req.params.id} route` });
  }
);

// @route   GET api/mentorship/student/:id/mentor
// @desc    Get mentor for a student
// @access  Private
router.get(
  '/student/:id/mentor',
  // auth,
  // mentorshipController.getStudentMentor
  (req, res) => {
    res.json({ msg: `Get mentor for student ${req.params.id} route` });
  }
);

// @route   POST api/mentorship/assign
// @desc    Assign mentor to student
// @access  Private/Admin
router.post(
  '/assign',
  // auth,
  // mentorshipController.assignMentor
  (req, res) => {
    res.json({ msg: 'Assign mentor route' });
  }
);

// @route   DELETE api/mentorship/unassign
// @desc    Unassign mentor from student
// @access  Private/Admin
router.delete(
  '/unassign',
  // auth,
  // mentorshipController.unassignMentor
  (req, res) => {
    res.json({ msg: 'Unassign mentor route' });
  }
);

// @route   POST api/mentorship/messages
// @desc    Send message between mentor and student
// @access  Private
router.post(
  '/messages',
  // auth,
  // mentorshipController.sendMessage
  (req, res) => {
    res.json({ msg: 'Send message route' });
  }
);

// @route   GET api/mentorship/messages/:roomId
// @desc    Get messages for a specific mentor-student pair
// @access  Private
router.get(
  '/messages/:roomId',
  // auth,
  // mentorshipController.getMessages
  (req, res) => {
    res.json({ msg: `Get messages for room ${req.params.roomId} route` });
  }
);

module.exports = router;

