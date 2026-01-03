import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  senderFullName: string;
  receiverFullName: string;
  currency:string;
  createdAt:string;
  status:string;
  senderUsername:string;
  receiverUsername:string;
}


const initialState = {
  transactions: [] as Transaction[],
  loading: false,
    error: null as string | null,
    transferLoading: false,
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

export const getMyTransactions = createAsyncThunk(
  'transaction/getMyTransactions',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get('/transactions/my-history');
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

const transactionSlice=createSlice({
    name:"transaction",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMyTransactions.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getMyTransactions.fulfilled,(state,action)=>{
            state.loading = false;
            state.transactions = action.payload;
        })
        .addCase(getMyTransactions.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch transactions';
        })
        .addCase(transfer.pending,(state)=>{
            state.transferLoading = true;
            state.error = null;
        })
        .addCase(transfer.fulfilled,(state,action)=>{
            state.transferLoading = false;
        })
        .addCase(transfer.rejected,(state,action)=>{
            state.transferLoading = false;
            state.error = action.payload?.message || 'Transfer failed';
        });


    }
})

export default transactionSlice.reducer;