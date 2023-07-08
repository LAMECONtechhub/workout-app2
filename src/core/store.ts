import {
  Action,
  ThunkAction,
  ThunkMiddleware,
  applyMiddleware,
  combineReducers,
  configureStore,
  createStore,
} from "@reduxjs/toolkit";
import { UserState } from "@/contexts/user.slice";
import userReducer from "@/contexts/user.slice";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { PrState } from "@/contexts/personal-records.slice";
import { WorkoutState } from "@/contexts/workout.slice";
export type AppState = {
  user: UserState;
  prs: PrState;
  workouts: WorkoutState;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

const combinedReducer = combineReducers({
  user: userReducer,
});

const bindMiddleware = (middleware: ThunkMiddleware[]) => {
  // if (true) { // TODO IS PRODUCTION
  //   return applyMiddleware(...middleware)
  // }
  const { composeWithDevTools } = require("redux-devtools-extension");
  return composeWithDevTools(applyMiddleware(...middleware));
};

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
