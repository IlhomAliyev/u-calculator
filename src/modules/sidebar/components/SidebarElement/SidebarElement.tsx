import { useAppDispatch } from "@/common/hooks";
import { addNumber, calculation, operation } from "@/modules/calculator/slice";
import { Button } from "@/ui/Button";
import { Display } from "@/ui/Display";
import { clsx } from "clsx";
import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isDisplay: boolean;
  data?: string[];
  isGrid: boolean | undefined;
  isOnCalc?: boolean;
  isDisabled?: boolean;
  isOnDragEnter?: boolean;
}

export const SidebarElement = ({
  isDisplay,
  data,
  isGrid,
  isOnCalc,
  isDisabled,
  isOnDragEnter,
  ...props
}: Props) => {
  const dispatch = useAppDispatch();

  const classNames = clsx(styles.sidebarElement, {
    [styles.sidebarElement__grid]: isGrid,
    [styles.sidebarElement__flex]: !isGrid,
    [styles.sidebarElement__onCalc]: isOnCalc,
    [styles.sidebarElement__disabled]: isDisabled,
    [styles.sidebarElement__insertUp]: isOnDragEnter,
  });

  const buttonHandler = (content: string) => {
    if (!isOnCalc) return;

    if (!isFinite(parseFloat(content)) && content !== "=" && content !== ".") {
      dispatch(operation(content));
    }

    if (isFinite(parseFloat(content)) || content === ".") {
      dispatch(addNumber(content));
    }

    if (content === "=") {
      dispatch(calculation());
    }
  };

  if (isDisplay) {
    return (
      <div className={classNames} {...props}>
        <Display isOnCalc={isOnCalc} />
      </div>
    );
  }

  return (
    <div className={classNames} {...props}>
      {data?.map((item) => (
        <Button key={item} onClick={() => buttonHandler(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};
