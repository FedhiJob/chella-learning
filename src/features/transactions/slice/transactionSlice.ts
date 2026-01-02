import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";


const initialState = {
  transactions: null as [] | null,
  loading: false,
    error: null as string | null,
}

export const transfer = createAsyncThunk(
  'transaction/transfer',
  async (
    userData: { amount: number; receicerUsername: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/transactions/transfer/', userData);

      return response.data; 
    } catch (error: any) {
      console.log(error)
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          'transfer failed',
        status: error.response?.status,
      });
    }
  }
);

const transactionSlice=createSlice({
    name:"transaction",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(transfer.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(transfer.fulfilled,(state,action)=>{
            state.loading = false;
        })
        .addCase(transfer.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch profile';
        });
      
      
    }
})

export default transactionSlice.reducer;