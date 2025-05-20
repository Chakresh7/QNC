import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseReducer from '../features/courses/courseSlice';
import projectReducer from '../features/projects/projectSlice';
import mentorshipReducer from '../features/mentorship/mentorshipSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    projects: projectReducer,
    mentorship: mentorshipReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

