import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCalcPayload, AppElement, AppMode } from "../types";

interface AppState {
  sidebarItems: AppElement[];
  calcItems: AppElement[];
  appMode: "runtime" | "constructor";
}

const sidebarItems: AppElement[] = [
  {
    id: 1,
    type: "display",
    isOnCalc: false,
  },
  {
    id: 2,
    type: "operators",
    isOnCalc: false,
  },
  {
    id: 3,
    type: "numbers",
    isOnCalc: false,
  },
  {
    id: 4,
    type: "equal",
    isOnCalc: false,
  },
];

const initialState: AppState = {
  sidebarItems,
  calcItems: [],
  appMode: "constructor",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    addToCalc: (
      state,
      { payload: { element, position } }: PayloadAction<AddToCalcPayload>
    ) => {
      const updatedElement = { ...element, isOnCalc: true };

      if (updatedElement.type === "display") {
        state.calcItems.unshift(updatedElement);
      } else if (position >= 0 && position < state.calcItems.length) {
        state.calcItems.splice(position, 0, updatedElement);
      } else {
        state.calcItems.push(updatedElement);
      }

      const index = state.sidebarItems.findIndex((i) => i.id === element.id);

      if (index !== -1) {
        state.sidebarItems[index].isOnCalc = true;
      }
    },
    deleteFromCalc: (state, { payload }: PayloadAction<AppElement>) => {
      state.calcItems = state.calcItems.filter(
        (item) => item.type !== payload.type
      );

      const index = state.sidebarItems.findIndex((i) => i.id === payload.id);

      if (index !== -1) {
        state.sidebarItems[index].isOnCalc = false;
      }
    },
    setAppMode: (state, { payload }: PayloadAction<AppMode>) => {
      state.appMode = payload;
    },
  },
});

export const selectAppMode = (state: RootState) => state.appReducer.appMode;
export const selectSidebarItems = (state: RootState) =>
  state.appReducer.sidebarItems;
export const selectCalcItems = (state: RootState) => state.appReducer.calcItems;

export const { addToCalc, deleteFromCalc, setAppMode } = appSlice.actions;

export const appReducer = appSlice.reducer;
