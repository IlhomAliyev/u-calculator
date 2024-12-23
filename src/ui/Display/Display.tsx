import { useAppSelector } from "@/common/hooks";
import { selectNextValue } from "@/modules/calculator/slice";
import { clsx } from "clsx";
import styles from "./styles.module.scss";

interface DisplayProps {
  isOnCalc: boolean | undefined;
}

export const Display = ({ isOnCalc }: DisplayProps) => {
  const nextValue = useAppSelector(selectNextValue);

  return (
    <div
      className={clsx(styles.display, {
        [styles.displaySmallFont]: nextValue && nextValue.length >= 9,
      })}
    >
      {isOnCalc ? nextValue : 0}
    </div>
  );
};
