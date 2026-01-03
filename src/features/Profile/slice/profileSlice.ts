import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../services/api";

interface Profile{
    id:string;
    fullname:string;
    username:string;
    referralCode:string;
    refferedBy:string | null;
    amount:number;
    totalEarned:number;
    totalReferred:number;
}

const initialState = {
  profile:  null as Profile | null,
  userProfile: null as Profile | null,
     loading: false,
    error: null as string | null,

}

export const getMyProfile = createAsyncThunk(
  'profile/getMyProfile',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get('/users/myprofile');
    console.log(response.data)
 
      return response.data; 
    } catch (error: any) {
      console.log(error)
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          'fetching failed',
        status: error.response?.status,
      });
    }
  }
);





const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMyProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getMyProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(getMyProfile.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch profile';
        });
      
      
    }
})

export default profileSlice.reducer;