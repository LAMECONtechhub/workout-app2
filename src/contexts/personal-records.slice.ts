import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { personalRecord } from "@/dto/personal-records.dto";
import { AppState } from "@/core/store";
import {
  database,
  database_id,
  pr_collection,
} from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

export interface PrState {
  personalRecords: personalRecord[] | [];
}
const initialState: PrState = {
  personalRecords: [],
};

export const fillPersonalRecords = createAsyncThunk(
  "prs/fetchPersonalRecords",
  async (userId: string) => {
    const prs = await database.listDocuments(database_id, pr_collection, [
      Query.equal("userId", userId),
    ]);

    return prs.documents as unknown as personalRecord[];
  }
);

export const prSlice: any = createSlice({
  name: "prs",
  initialState: initialState,
  reducers: {
    setPrs: (state: PrState, action: PayloadAction<personalRecord[]>) => {
      state.personalRecords = action.payload;
    },
    resetPrs: (state: PrState) => {
      state.personalRecords = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fillPersonalRecords.fulfilled, (state, action) => {
      state.personalRecords = action.payload;
    });
  },
});
export const { resetPrs, setPrs } = prSlice.actions;
export const SelectPrs = (state: AppState) => state.prs;
export default prSlice.reducer;
