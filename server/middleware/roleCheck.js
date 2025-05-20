const User = require('../models/User');

// Middleware to check if user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admin role required.' });
    }
    
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Middleware to check if user is a mentor
exports.isMentor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (user.role !== 'mentor' && user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Mentor role required.' });
    }
    
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Middleware to check if user is a student
exports.isStudent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (user.role !== 'student') {
      return res.status(403).json({ msg: 'Access denied. Student role required.' });
    }
    
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Middleware to check if user is either a mentor or the specific student
exports.isMentorOrSpecificStudent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Allow if user is a mentor or admin
    if (user.role === 'mentor' || user.role === 'admin') {
      return next();
    }
    
    // Allow if user is the specific student (e.g., viewing their own profile)
    if (user.role === 'student' && user._id.toString() === req.params.id) {
      return next();
    }
    
    return res.status(403).json({ msg: 'Access denied.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

