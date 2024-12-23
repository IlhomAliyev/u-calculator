import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CalculatorState {
  prevValue: string | null;
  nextValue: string | null;
  operator: string | null;
}

const initialState: CalculatorState = {
  prevValue: null,
  nextValue: "0",
  operator: null,
};

export const calculatorSlice = createSlice({
  name: "calculatorSlice",
  initialState,
  reducers: {
    addNumber: (state, { payload }: PayloadAction<string>) => {
      if (state.nextValue && state.nextValue?.length >= 17) return;

      if (payload === "." && state.nextValue?.includes(".")) {
        return state;
      }

      if (state.nextValue === "0" && payload === "0") {
        return state;
      }

      if (state.nextValue === "0" && payload !== "0" && payload !== ".") {
        state.nextValue = "";
      }

      state.nextValue += payload;
    },
    operation: (state, { payload }: PayloadAction<string>) => {
      state.operator = payload;
      state.prevValue = `${state.nextValue}`;
      state.nextValue = "0";
    },
    calculation: (state) => {
      if (
        state.operator === "/" &&
        (state.prevValue === "0" || state.nextValue === "0")
      ) {
        state.nextValue = "Не определено";
        return;
      }

      if (state.prevValue && state.nextValue) {
        state.nextValue = String(
          eval(state.prevValue + state.operator + state.nextValue)
        );
        state.prevValue = null;
        state.operator = null;
      }
    },
    reset: (state) => {
      state.nextValue = "0";
    },
  },
});

export const selectNextValue = (state: RootState) =>
  state.calculatorReducer.nextValue;
export const selectPrevValue = (state: RootState) =>
  state.calculatorReducer.prevValue;
export const selectOperator = (state: RootState) =>
  state.calculatorReducer.operator;

export const { addNumber, operation, calculation, reset } =
  calculatorSlice.actions;

export const calculatorReducer = calculatorSlice.reducer;
