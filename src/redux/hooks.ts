import { AppState } from "@/core/store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<any>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
