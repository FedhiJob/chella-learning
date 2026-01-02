import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import type { User } from "../../../types/index";

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
  user: null as null | User,
  loading: false,
  error: null as null | string,
  token: localStorage.getItem('token')  || null,
};


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    userData: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/users/login/', userData);
    console.log(response.data)
  if(response.data.accessToken){
    localStorage.setItem('token',response.data.accessToken)
    localStorage.setItem('referralCode',response.data.referralCode)
    localStorage.setItem('isAuthenticated','true')
  }
      return response.data; 
    } catch (error: any) {
      console.log(error)
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          'Login failed',
        status: error.response?.status,
      });
    }
  }
);



export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { fullName:string ; username: string; password: string, refferedBy?:string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/users/register/', userData);
    console.log(response.data)

      return response.data; 
    } catch (error: any) {
      console.log(error)
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          'Login failed',
        status: error.response?.status,
      });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
    reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
     localStorage.removeItem('token');
     localStorage.removeItem('isAuthenticated');
     localStorage.removeItem('referralCode');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action:PayloadAction<any>) => {
            state.loading = false;
            state.isAuthenticated = true;
            
            state.token=action.payload.accessToken;

            
        })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
      }) 

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action:PayloadAction) => {
            state.loading = false;

            
        })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Register failed';
      });
    },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
