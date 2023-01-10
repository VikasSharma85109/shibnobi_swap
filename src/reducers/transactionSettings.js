import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ETH: {
    deadline: "10",
    percentage: "0.5",
  },

  BSC: {
    deadline: "10",
    percentage: "0.5",
  },
};

export const transaction = createSlice({
  name: "transactionSetting",
  initialState,
  reducers: {
    addETHDealine: (state, action) => {
      state.ETH.deadline = action.payload;
    },
    addBSCDeadline: (state, action) => {
      state.BSC.deadline = action.payload;
    },
    addETHPercentage: (state, action) => {
      state.ETH.percentage = action.payload;
    },
    addBSCPercentage: (state, action) => {
      state.BSC.percentage = action.payload;
    },
  },
});

export const {
  addETHDealine,
  addBSCDeadline,
  addETHPercentage,
  addBSCPercentage,
} = transaction.actions;

export default transaction.reducer;
