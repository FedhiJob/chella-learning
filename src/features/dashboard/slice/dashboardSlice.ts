import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

interface DashboardStats {
  totalEarned: number;
  totalReferred: number;
  balance: number;
  tasksCompleted: number;
}

interface RejectValue {
  message: string;
}

const initialState = {
  stats: {
    totalEarned: 0,
    totalReferred: 0,
    balance: 0,
    tasksCompleted: 0,
  } as DashboardStats,
  loading: false,
  error: null as string | null,
};

export const getDashboardStats = createAsyncThunk<
  DashboardStats,
  void,
  { rejectValue: RejectValue }
>("dashboard/getStats", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users/dashboard-stats");
    return response.data as DashboardStats;
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return rejectWithValue({
      message: err.response?.data?.message || err.message || "fetching failed",
    });
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to fetch stats";
      });
  },
});

export default dashboardSlice.reducer;

