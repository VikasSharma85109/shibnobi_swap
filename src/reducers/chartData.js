import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartValue: {},
};

export const chartData = createSlice({
  name: "transactionSetting",
  initialState,
  reducers: {
    chartValue: (state, action) => {
      state.chartValue = action.payload;
    },
  },
});

export const { chartValue } = chartData.actions;

export default chartData.reducer;
