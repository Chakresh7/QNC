import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Resource {
  title: string;
  type: 'video' | 'article' | 'quiz' | 'exercise' | 'project' | 'other';
  url: string;
  description: string;
}

interface Module {
  _id: string;
  title: string;
  description: string;
  content: string;
  resources: Resource[];
  duration: number;
  order: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  gradeRange: {
    min: number;
    max: number;
  };
  modules: Module[];
  prerequisites: string[];
  duration: number;
  enrolledStudents: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseState {
  courses: Course[];
  course: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  course: null,
  loading: false,
  error: null,
};

// Get all courses
export const getCourses = createAsyncThunk(
  'courses/getCourses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get('/api/courses', config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch courses');
    }
  }
);

// Get course by ID
export const getCourseById = createAsyncThunk(
  'courses/getCourseById',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get(`/api/courses/${id}`, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch course');
    }
  }
);

// Enroll in a course
export const enrollCourse = createAsyncThunk(
  'courses/enrollCourse',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.post(`/api/courses/${id}/enroll`, {}, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to enroll in course');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCourse: (state) => {
      state.course = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all courses
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(getCourses.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get course by ID
      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.course = action.payload;
        state.loading = false;
      })
      .addCase(getCourseById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Enroll in a course
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.course = action.payload;
        state.loading = false;
      })
      .addCase(enrollCourse.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCourse, clearError } = courseSlice.actions;

export default courseSlice.reducer;

