import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    currentTasks: [],
    currentTask: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    cleanTasks: (state) => {
      state.currentTasks = [];
      state.currentTask = null;
    },
    fetchingSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    fetchingTasksStart: (state) => {
      state.currentTasks = [];
      state.error = false;
      state.isFetching = true;
    },
    fetchingTaskStart: (state) => {
      state.currentTask = null;
      state.error = false;
      state.isFetching = true;
    },
    fetchingTasksSuccess: (state, action) => {
      state.currentTasks = action.payload;
      state.error = false;
      state.isFetching = false;
    },
    fetchingTaskSuccess: (state, action) => {
      state.currentTask = action.payload;
      state.error = false;
      state.isFetching = false;
    },
    fetchingError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const {
  cleanTasks,
  fetchingSuccess,
  fetchingTasksStart,
  fetchingTaskStart,
  fetchingTasksSuccess,
  fetchingTaskSuccess,
  fetchingError,
} = taskSlice.actions;
export default taskSlice.reducer;
