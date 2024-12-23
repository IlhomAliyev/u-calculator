import { clsx } from "clsx";
import { ReactElement } from "react";
import styles from "./styles.module.scss";

export interface Variant {
  id: string;
  label: string;
  icon?: ReactElement;
}

interface Props<T> {
  variants: [Variant, Variant];
  value: string;
  onChange: (value: T) => void;
  className?: string;
}

export const CustomSwitch = <T,>({
  variants,
  value,
  onChange,
  className,
}: Props<T>) => {
  const firstVariant = variants[0];
  const secondVariant = variants[1];

  return (
    <div className={clsx(styles.switchField, className)}>
      <input
        type="radio"
        id={firstVariant.id}
        checked={value === firstVariant.id}
        onChange={() => onChange(firstVariant.id as T)}
      />
      <label htmlFor={firstVariant.id}>
        {firstVariant?.icon}
        <span>{firstVariant.label}</span>
      </label>
      <input
        type="radio"
        id={secondVariant.id}
        checked={value === secondVariant.id}
        onChange={() => onChange(secondVariant.id as T)}
      />
      <label htmlFor={secondVariant.id}>
        {secondVariant?.icon}
        <span>{secondVariant.label}</span>
      </label>
    </div>
  );
};
