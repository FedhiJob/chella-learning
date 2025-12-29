import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../services/api";

const initialState = {
  referrals: [] as Referral[],
  referralCode: localStorage.getItem('referralCode') || "",
  loading: false,
    error: null as string | null,
}

export interface Referral {
  id: string;
  referredUserFullName: string;
  referredUserUsername: string;
}

export const getMyReferrals = createAsyncThunk(
  'referral/getMyReferrals',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get('/referrals/my-referred-users');
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

// export const getMyReferralCode = createAsyncThunk(
//   'referral/getMyReferralCode',
//   async (
//     _,
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.get('/referrals/get-myreferral-code');
//     console.log(response.data)
 
//       return response.data; 
//     } catch (error: any) {
//       console.log(error)
//       return rejectWithValue({
//         message:
//           error.response?.data?.message ||
//           error.message ||
//           'fetching failed',
//         status: error.response?.status,
//       });
//     }
//   }
// );





const referralSlice=createSlice({
    name:"referral",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMyReferrals.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getMyReferrals.fulfilled,(state,action)=>{
            state.loading = false;
            state.referrals = action.payload;
        })
        .addCase(getMyReferrals.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch referrals';
        });
      
    }
})

export default referralSlice.reducer;