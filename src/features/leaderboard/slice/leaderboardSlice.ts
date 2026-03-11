import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  fullName: string;
  totalEarned: number;
  totalReferred: number;
  avatar?: string;
}

interface RejectValue {
  message: string;
}

const initialState = {
  topEarners: [] as LeaderboardEntry[],
  topReferrers: [] as LeaderboardEntry[],
  loading: false,
  error: null as string | null,
};

export const getTopEarners = createAsyncThunk<
  LeaderboardEntry[],
  void,
  { rejectValue: RejectValue }
>("leaderboard/getTopEarners", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/leaderboard/top-earners");
    return response.data as LeaderboardEntry[];
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

export const getTopReferrers = createAsyncThunk<
  LeaderboardEntry[],
  void,
  { rejectValue: RejectValue }
>("leaderboard/getTopReferrers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/leaderboard/top-referrers");
    return response.data as LeaderboardEntry[];
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

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopEarners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopEarners.fulfilled, (state, action) => {
        state.loading = false;
        state.topEarners = action.payload;
      })
      .addCase(getTopEarners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to fetch earners";
      })
      .addCase(getTopReferrers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopReferrers.fulfilled, (state, action) => {
        state.loading = false;
        state.topReferrers = action.payload;
      })
      .addCase(getTopReferrers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to fetch referrers";
      });
  },
});

export default leaderboardSlice.reducer;

