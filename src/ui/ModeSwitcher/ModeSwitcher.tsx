import { selectAppMode, setAppMode } from "@/app/slice";
import { AppMode } from "@/app/types";
import ConstructorIcon from "@/assets/icons/contructor-icon.svg?react";
import RuntimeIcon from "@/assets/icons/runtime-icon.svg?react";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import styles from "./styles.module.scss";

export const ModeSwitcher = () => {
  const dispatch = useAppDispatch();
  const appMode = useAppSelector(selectAppMode);

  const handleClick = (appMode: AppMode) => {
    dispatch(setAppMode(appMode));
  };

  return (
    <div className={styles.switchField}>
      <input
        type="radio"
        id="runtime"
        checked={appMode === "runtime"}
        onChange={() => handleClick("runtime")}
      />
      <label htmlFor="runtime">
        <RuntimeIcon stroke={appMode === "runtime" ? "#5D5FEF" : "#4D5562"} />
        <span>Runtime</span>
      </label>
      <input
        type="radio"
        id="constructor"
        checked={appMode === "constructor"}
        onChange={() => handleClick("constructor")}
      />
      <label htmlFor="constructor">
        <ConstructorIcon
          stroke={appMode === "constructor" ? "#5D5FEF" : "#4D5562"}
        />
        <span>Constructor</span>
      </label>
    </div>
  );
};
