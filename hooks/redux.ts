import { AppState } from "@app/store";
import { ThunkAction } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type Fn<R = any> = (...args: any[]) => R;

export type ThunkActionFn = Fn<ThunkAction<any, any, any, any>>;

export type ThunkReturnType<
  T extends (...args: any[]) => ThunkAction<any, any, any, any>
> = T extends (...args: any[]) => ThunkAction<infer R, any, any, any> ? R : any;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function useAppDispatch<T extends Fn>(
  action: T
): (
  ...args: Parameters<T>
) => T extends ThunkActionFn ? ThunkReturnType<T> : ReturnType<T> {
  const dispatch = useDispatch();

  return useCallback((...args: Parameters<T>) => dispatch(action(...args)), []);
}
