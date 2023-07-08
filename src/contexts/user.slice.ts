import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserSumaryDto } from "@/dto/user.dto";
import { AppState } from "@/core/store";
import {
  database,
  database_id,
  user_collection,
} from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

enum UserStatus {
  Anonymous,
  Loading,
  LoggedIn,
}
export interface UserState {
  currentUser: UserData | null;
  status: UserStatus;
}

const initialState: UserState = {
  currentUser: null,
  status: UserStatus.Anonymous,
};

export const fillUserSummaryAsync = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const userInfo = await database.listDocuments(
      database_id,
      user_collection,
      [Query.equal("userId", userId)]
    );
    const userDocument = userInfo.documents[0];
    // Map the userDocument to UserSummaryDto shape
    const userSummary: UserData = {
      userId: userDocument.userId,
      name: userDocument.name,
      age: userDocument.age,
      email: userDocument.email,
      strengthTraining: userDocument.strengthTraining,
      weight: userDocument.weight,
      height: userDocument.height,
      // Include other properties from UserSumaryDto as needed
    };

    return userSummary;
  }
);

export const userSlice: any = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserSummary: (state: UserState, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
    },
    resetUser: (state: UserState) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fillUserSummaryAsync.pending, (state) => {
        state.status = UserStatus.Loading;
      })
      .addCase(fillUserSummaryAsync.fulfilled, (state, action) => {
        state.status = UserStatus.LoggedIn;
        state.currentUser = action.payload;
      });
  },
});
export const { resetUser, setUserSummary } = userSlice.actions;
export const SelectUser = (state: AppState) => state.user;
export default userSlice.reducer;
