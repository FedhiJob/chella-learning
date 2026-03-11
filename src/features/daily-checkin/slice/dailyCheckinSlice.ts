import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export interface DailyCheckin {
  id: string;
  day: number;
  reward: number;
  claimed: boolean;
}

interface CheckinStatus {
  canCheckIn: boolean;
  streak: number;
  lastCheckIn: string | null;
  checkins: DailyCheckin[];
}

interface RejectValue {
  message: string;
}

const initialState = {
  checkinStatus: null as CheckinStatus | null,
  loading: false,
  error: null as string | null,
  checkinLoading: false,
};

export const getCheckinStatus = createAsyncThunk<
  CheckinStatus,
  void,
  { rejectValue: RejectValue }
>("dailyCheckin/getStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/daily-checkin/status");
    return response.data as CheckinStatus;
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

export const claimDailyReward = createAsyncThunk<
  { reward: number; message: string },
  number,
  { rejectValue: RejectValue }
>("dailyCheckin/claim", async (day, { rejectWithValue }) => {
  try {
    const response = await api.post(`/daily-checkin/claim/${day}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return rejectWithValue({
      message: err.response?.data?.message || err.message || "claim failed",
    });
  }
});

const dailyCheckinSlice = createSlice({
  name: "dailyCheckin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCheckinStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCheckinStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.checkinStatus = action.payload;
      })
      .addCase(getCheckinStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to fetch checkin status";
      })
      .addCase(claimDailyReward.pending, (state) => {
        state.checkinLoading = true;
        state.error = null;
      })
      .addCase(claimDailyReward.fulfilled, (state) => {
        state.checkinLoading = false;
      })
      .addCase(claimDailyReward.rejected, (state, action) => {
        state.checkinLoading = false;
        state.error = action.payload?.message ?? "Failed to claim reward";
      });
  },
});

export default dailyCheckinSlice.reducer;

