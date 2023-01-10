import { configureStore } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { combineReducers } from "@reduxjs/toolkit";

import wallectReducers from "../reducers/wallectReducers";
import transactionSettings from "../reducers/transactionSettings";
import chartData from "../reducers/chartData";

const reducers = combineReducers({
  counter: wallectReducers,
  transactionSetting: transactionSettings,
  chartData: chartData,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
