export type AppMode = "runtime" | "constructor";

export type AppElementType = "display" | "operators" | "numbers" | "equal";

export interface AppElement {
  id: string | number;
  type: AppElementType;
  isOnCalc: boolean;
}

export interface AddToCalcPayload {
  element: AppElement;
  position: number;
}