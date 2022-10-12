import {
  Action,
  AnyAction,
  CombinedState,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import rootReducers from "./reducers";
import { storage } from "./storage";

export const reducers = (
  state: ReturnType<typeof rootReducers>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    return nextState;
  } else {
    return rootReducers(state, action);
  }
};

const makeConfiguredStore = (reducer: CombinedState<typeof rootReducers>) =>
  configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return makeConfiguredStore(reducers as CombinedState<typeof rootReducers>);
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require("redux-persist");

    const persistConfig = {
      key: "task-app",
      whitelist: ["task"], // make sure it does not clash with server keys
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducers);
    const store = makeConfiguredStore(persistedReducer);
    // @ts-ignore
    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
