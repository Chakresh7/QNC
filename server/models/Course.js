const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['video', 'article', 'quiz', 'exercise', 'project', 'other']
    },
    url: String,
    description: String
  }],
  duration: {
    type: Number, // in minutes
    required: true
  },
  order: {
    type: Number,
    required: true
  }
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  gradeRange: {
    min: {
      type: Number,
      min: 6,
      max: 12,
      required: true
    },
    max: {
      type: Number,
      min: 6,
      max: 12,
      required: true
    }
  },
  modules: [ModuleSchema],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  duration: {
    type: Number, // total duration in minutes
    required: true
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);

