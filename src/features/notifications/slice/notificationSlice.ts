import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  read: boolean;
  createdAt: string;
}

interface RejectValue {
  message: string;
}

const initialState = {
  notifications: [] as Notification[],
  unreadCount: 0,
  loading: false,
  error: null as string | null,
};

export const getMyNotifications = createAsyncThunk<
  Notification[],
  void,
  { rejectValue: RejectValue }
>("notification/getMyNotifications", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/notifications/my-notifications");
    return response.data as Notification[];
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

export const markAsRead = createAsyncThunk<
  string,
  string,
  { rejectValue: RejectValue }
>("notification/markAsRead", async (notificationId, { rejectWithValue }) => {
  try {
    await api.patch(`/notifications/${notificationId}/read`);
    return notificationId;
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return rejectWithValue({
      message: err.response?.data?.message || err.message || "mark as read failed",
    });
  }
});

export const markAllAsRead = createAsyncThunk<
  void,
  void,
  { rejectValue: RejectValue }
>("notification/markAllAsRead", async (_, { rejectWithValue }) => {
  try {
    await api.patch("/notifications/mark-all-read");
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return rejectWithValue({
      message: err.response?.data?.message || err.message || "mark all read failed",
    });
  }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount++;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
      })
      .addCase(getMyNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Failed to fetch notifications";
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (n) => n.id === action.payload
        );
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => (n.read = true));
        state.unreadCount = 0;
      });
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

