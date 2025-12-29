import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../../services/api";
import type { PayloadAction } from "@reduxjs/toolkit";


interface  Task {
    id:string;
    title:string;
    rewardAmount:number;
    taskDate:string;
}




const initialState = {
  tasks: [] as Task[] ,
  completedTasks: [] as any,
  error: null as string | null,
  loading: false,
    completeLoading:false,
    completedTaskLoading:false
}


export const getTodaysTask = createAsyncThunk(
  'task/getTodaysTask',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get('/tasks/get-today-tasks');
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

export const completeTask = createAsyncThunk(
  'task/completeTask',
  async (
    taskId,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`tasks/complete-task/${taskId}`);
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



export const getCompletedTasks = createAsyncThunk(
  'task/getCompletedTasks',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get('/tasks/get-my-completed-tasks');
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




const taskSlice=createSlice({
    name:"task",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getTodaysTask.pending, (state) => {
                state.loading = true;
                state.error = null;
                })
                .addCase(getTodaysTask.fulfilled, (state, action:PayloadAction<Task[]>) => {
                    state.loading = false;
               state.tasks=action.payload
                    
                })
              .addCase(getTodaysTask.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message || 'get tasks failed';
              })


               .addCase(completeTask.pending, (state) => {
                state.completeLoading = true;
                state.error = null;
                })
                .addCase(completeTask.fulfilled, (state, action:PayloadAction<any>) => {
                    state.completeLoading = false;
               
                    
                })
              .addCase(completeTask.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.message || 'get tasks failed';
              })
               .addCase(getCompletedTasks.pending, (state) => {
                state.completedTaskLoading = true;
                state.error = null;
                })
                .addCase(getCompletedTasks.fulfilled, (state, action:PayloadAction<any>) => {
                    state.completedTaskLoading = false;
                  state.completedTasks=action.payload;
                    
                })
              .addCase(getCompletedTasks.rejected, (state, action: PayloadAction<any>) => {
                state.completedTaskLoading = false;
                state.error = action.payload.message || 'get tasks failed';
              });
    }
})

export default taskSlice.reducer;