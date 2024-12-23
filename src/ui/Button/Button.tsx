import { selectAppMode } from "@/app/slice";
import { useAppSelector } from "@/common/hooks";
import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

export const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const appMode = useAppSelector(selectAppMode);

  const classNames = clsx(styles.button, {
    [styles.button__blue]: children === "=",
  });

  return (
    <button
      className={classNames}
      disabled={appMode === "constructor"}
      {...props}
    >
      {children}
    </button>
  );
};
