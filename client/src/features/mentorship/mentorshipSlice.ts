import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  roomId: string;
  content: string;
  attachments: {
    name: string;
    url: string;
    type: string;
  }[];
  read: boolean;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  grade?: number;
  avatar?: string;
}

interface MentorshipState {
  mentors: User[];
  students: User[];
  messages: Message[];
  currentRoomId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: MentorshipState = {
  mentors: [],
  students: [],
  messages: [],
  currentRoomId: null,
  loading: false,
  error: null,
};

// Get all mentors
export const getMentors = createAsyncThunk(
  'mentorship/getMentors',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get('/api/mentorship/mentors', config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch mentors');
    }
  }
);

// Get all students
export const getStudents = createAsyncThunk(
  'mentorship/getStudents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get('/api/mentorship/students', config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch students');
    }
  }
);

// Get mentor's students
export const getMentorStudents = createAsyncThunk(
  'mentorship/getMentorStudents',
  async (mentorId: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get(`/api/mentorship/mentor/${mentorId}/students`, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch mentor students');
    }
  }
);

// Get student's mentor
export const getStudentMentor = createAsyncThunk(
  'mentorship/getStudentMentor',
  async (studentId: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get(`/api/mentorship/student/${studentId}/mentor`, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch student mentor');
    }
  }
);

// Assign mentor to student
export const assignMentor = createAsyncThunk(
  'mentorship/assignMentor',
  async ({ mentorId, studentId }: { mentorId: string; studentId: string }, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.post('/api/mentorship/assign', { mentorId, studentId }, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to assign mentor');
    }
  }
);

// Get messages
export const getMessages = createAsyncThunk(
  'mentorship/getMessages',
  async (roomId: string, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.get(`/api/mentorship/messages/${roomId}`, config);
      return { messages: res.data, roomId };
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to fetch messages');
    }
  }
);

// Send message
export const sendMessage = createAsyncThunk(
  'mentorship/sendMessage',
  async (messageData: { receiver: string; content: string; roomId: string }, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': state.auth.token,
        },
      };
      
      const res = await axios.post('/api/mentorship/messages', messageData, config);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.msg || 'Failed to send message');
    }
  }
);

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {
    setCurrentRoomId: (state, action: PayloadAction<string>) => {
      state.currentRoomId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
      state.currentRoomId = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all mentors
      .addCase(getMentors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMentors.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.mentors = action.payload;
        state.loading = false;
      })
      .addCase(getMentors.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all students
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudents.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(getStudents.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get mentor's students
      .addCase(getMentorStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMentorStudents.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(getMentorStudents.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get student's mentor
      .addCase(getStudentMentor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentMentor.fulfilled, (state, action: PayloadAction<User>) => {
        state.mentors = [action.payload];
        state.loading = false;
      })
      .addCase(getStudentMentor.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Assign mentor to student
      .addCase(assignMentor.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignMentor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(assignMentor.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get messages
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action: PayloadAction<{ messages: Message[]; roomId: string }>) => {
        state.messages = action.payload.messages;
        state.currentRoomId = action.payload.roomId;
        state.loading = false;
      })
      .addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentRoomId, addMessage, clearMessages, clearError } = mentorshipSlice.actions;

export default mentorshipSlice.reducer;

