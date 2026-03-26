import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rewardAmount: number;
  isEarned: boolean;
  earnedAt?: string;
}

interface RejectValue {
  message: string;
}

const initialState = {
  achievements: [] as Achievement[],
  loading: false,
  error: null as string | null,
};

export const getAchievements = createAsyncThunk<Achievement[], void, { rejectValue: RejectValue }>(
  "achievements/getAchievements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/achievements/get-my-achievements");
      return response.data as Achievement[];
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to fetch achievements",
      });
    }
  }
);

export const claimAchievement = createAsyncThunk<unknown, string, { rejectValue: RejectValue }>(
  "achievements/claimAchievement",
  async (achievementId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/achievements/claim/${achievementId}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue({
        message: err.response?.data?.message || err.message || "Failed to claim achievement",
      });
    }
  }
);

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload;
      })
      .addCase(getAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to fetch achievements";
      })
      .addCase(claimAchievement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(claimAchievement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(claimAchievement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to claim achievement";
      });
  },
});

export default achievementsSlice.reducer;

