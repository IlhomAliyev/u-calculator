import {
  addToCalc,
  deleteFromCalc,
  selectAppMode,
  selectCalcItems,
  selectSidebarItems,
  setAppMode,
} from "@/app/slice";
import { AppElementType, AppMode } from "@/app/types";
import ConstructorIcon from "@/assets/icons/contructor-icon.svg?react";
import RuntimeIcon from "@/assets/icons/runtime-icon.svg?react";
import { itemsData } from "@/common/constants";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { clsx } from "clsx";
import React, { useState } from "react";
import { SidebarElement } from "../sidebar/components/SidebarElement";
import { reset } from "./slice";
import GroupIcon from "./assets/icons/group-icon.svg?react";
import styles from "./styles.module.scss";

import { CustomSwitch, Variant } from "@/ui/CustomSwitch";

const appModeVariants: [Variant, Variant] = [
  {
    id: "runtime",
    label: "Runtime",
    icon: <RuntimeIcon />,
  },
  {
    id: "constructor",
    label: "Constructor",
    icon: <ConstructorIcon />,
  },
];

export const Calculator = () => {
  const dispatch = useAppDispatch();
  const calcItems = useAppSelector(selectCalcItems);
  const sidebarItems = useAppSelector(selectSidebarItems);
  const appMode = useAppSelector(selectAppMode);
  const [onDragEnter, setOnDragEnter] = useState<string | null>(null);

  const onModeChange = (appMode: AppMode) => {
    dispatch(setAppMode(appMode));
  };

  const onDragEnterHandler = (
    e: React.DragEvent<HTMLDivElement>,
    elemType: AppElementType | "calculator"
  ) => {
    e.stopPropagation();
    setOnDragEnter(elemType);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOnDragEnter(null);

    const elemType = e.dataTransfer.getData("elemType");
    const elemInCalc = calcItems.find(({ type }) => type === elemType);
    const indexElemInCalc = calcItems.findIndex(
      ({ type }) => type === elemType
    );
    const elemInSidebar = sidebarItems.find(({ type }) => type === elemType);

    if (onDragEnter === elemType) return;

    if (elemInCalc?.type === "display") return;

    if (indexElemInCalc > -1) {
      if (onDragEnter === "calculator") {
        dispatch(deleteFromCalc(calcItems[indexElemInCalc]));
        if (elemInCalc) {
          dispatch(addToCalc({ element: elemInCalc, position: -1 }));
        }
      }

      if (onDragEnter !== "calculator" && onDragEnter !== "display") {
        dispatch(deleteFromCalc(calcItems[indexElemInCalc]));
        const elem = calcItems.find((item) => item.type === onDragEnter);
        const position =
          elem && calcItems.findIndex((item) => item.type === elem.type);

        if (elemInCalc) {
          dispatch(
            addToCalc({
              element: elemInCalc,
              position: position !== undefined ? position : 0,
            })
          );
        }
      }
    }

    if (indexElemInCalc === -1) {
      if (onDragEnter === "calculator" && elemInSidebar) {
        dispatch(addToCalc({ element: elemInSidebar, position: -1 }));
      }

      if (onDragEnter !== "calculator" && onDragEnter !== "display") {
        const block = calcItems.find((item) => item.type === onDragEnter);
        const position =
          block && calcItems.findIndex((item) => item.type === block.type);
        if (elemInSidebar) {
          dispatch(
            addToCalc({
              element: elemInSidebar,
              position: position !== undefined ? position : 0,
            })
          );
        }
      }
    }
  };

  const deleteElemHandler = (elemType: AppElementType) => {
    if (appMode === "runtime") return;
    if (elemType === "display") dispatch(reset());

    const elem = calcItems.find((block) => block.type === elemType);

    if (elem) {
      dispatch(deleteFromCalc(elem));
    }
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elemType: string
  ) => {
    e.dataTransfer.setData("elemType", elemType);
  };

  const calcClassNames = clsx(styles.calculator, {
    [styles.calculator__initialOnDrag]:
      onDragEnter === "calculator" && calcItems.length === 0,
    [styles.calculator__initial]: calcItems.length === 0,
    [styles.calculator__insertDown]:
      onDragEnter === "calculator" &&
      calcItems.length > 0 &&
      calcItems.length < 3,
  });

  const calcInfoClassNames = clsx(styles.calculator__info, {
    [styles.calculator__infoDisabled]: calcItems.length > 0,
  });

  return (
    <div className={styles.calculator__wrapper}>
      <CustomSwitch
        variants={appModeVariants}
        value={appMode}
        onChange={onModeChange}
      />

      <div
        className={calcClassNames}
        onDrop={onDropHandler}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => onDragEnterHandler(e, "calculator")}
      >
        <div className={calcInfoClassNames}>
          <GroupIcon />
          <span>Перетащите сюда</span>
          <span>любой элемент из левой панели</span>
        </div>

        {calcItems?.map(({ id, type, isOnCalc }) => (
          <SidebarElement
            key={id}
            draggable={type !== "display" && appMode === "constructor"}
            data={itemsData[type as keyof typeof itemsData]}
            isGrid={type === "numbers"}
            isDisplay={type === "display"}
            onDoubleClick={() => deleteElemHandler(type)}
            onDragEnter={(e) => onDragEnterHandler(e, type)}
            onDragStart={(e) => onDragStart(e, type)}
            isOnCalc={isOnCalc}
            isOnDragEnter={onDragEnter === type}
          />
        ))}
      </div>
    </div>
  );
};
