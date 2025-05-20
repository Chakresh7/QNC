import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Feedback {
  _id: string;
  mentor: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  content: string;
  student: string;
  course: string;
  status: 'draft' | 'submitted' | 'in-review' | 'completed';
  projectType: 'individual' | 'group';
  collaborators: string[];
  technologies: string[];
  repositoryUrl: string;
  demoUrl: string;
  feedback: Feedback[];
  submittedAt: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  projects: Project[];
  project: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
};

// Get all projects
export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get('/api/projects', config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch projects');
    }
  }
);

// Get project by ID
export const getProjectById = createAsyncThunk(
  'projects/getProjectById',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get(`/api/projects/${id}`, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch project');
    }
  }
);

// Create a project
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (formData: any, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.post('/api/projects', formData, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to create project');
    }
  }
);

// Update a project
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, formData }: { id: string; formData: any }, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.put(`/api/projects/${id}`, formData, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to update project');
    }
  }
);

// Submit a project
export const submitProject = createAsyncThunk(
  'projects/submitProject',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.post(`/api/projects/${id}/submit`, {}, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to submit project');
    }
  }
);

// Provide feedback on a project
export const provideFeedback = createAsyncThunk(
  'projects/provideFeedback',
  async ({ id, feedback }: { id: string; feedback: { content: string; rating: number } }, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.post(`/api/projects/${id}/feedback`, feedback, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to provide feedback');
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProject: (state) => {
      state.project = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all projects
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getProjects.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get project by ID
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
        state.project = action.payload;
        state.loading = false;
      })
      .addCase(getProjectById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create a project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update a project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
        state.project = action.payload;
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit a project
      .addCase(submitProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
        state.project = action.payload;
        state.loading = false;
      })
      .addCase(submitProject.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Provide feedback on a project
      .addCase(provideFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(provideFeedback.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
        state.project = action.payload;
        state.loading = false;
      })
      .addCase(provideFeedback.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProject, clearError } = projectSlice.actions;

export default projectSlice.reducer;

