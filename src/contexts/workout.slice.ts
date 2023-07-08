import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workout } from "@/dto/workout.dto";
import { AppState } from "@/core/store";
import {
  database,
  database_id,
  workout_Collection,
} from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

export interface WorkoutState {
  workouts: Workout[] | [];
  status: WorkoutStatus;
}
enum WorkoutStatus {
  Anonymous,
  Loading,
  Loaded,
}
const initialState: WorkoutState = {
  workouts: [],
  status: WorkoutStatus.Anonymous,
};

export const fillWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async (userId: string) => {
    const workouts = await database.listDocuments(
      database_id,
      workout_Collection,
      [Query.equal("userId", userId)]
    );

    return workouts.documents
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState: initialState,
  reducers: {
    setWorkouts: (state: WorkoutState, action: PayloadAction<[]>) => {
      state.workouts = action.payload;
    },
    resetWorkouts: (state: WorkoutState) => {
      state.workouts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fillWorkouts.pending, (state) => {
        state.status = WorkoutStatus.Loading;
      })
      .addCase(fillWorkouts.fulfilled, (state, action) => {
        state.status = WorkoutStatus.Loaded;
        state.workouts = action.payload;
      });
  },
});
export const { setWorkouts, resetWorkouts } = workoutSlice.actions;
export const SelectWorkouts = (state: AppState) => state.workouts;
export default workoutSlice.reducer;
