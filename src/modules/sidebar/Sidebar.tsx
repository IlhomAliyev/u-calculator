import { selectAppMode, selectSidebarItems } from "@/app/slice";
import { itemsData } from "@/common/constants";
import { useAppSelector } from "@/common/hooks";
import { clsx } from "clsx";
import { SidebarElement } from "./components/SidebarElement";
import styles from "./styles.module.scss";

export const Sidebar = () => {
  const sidebarItems = useAppSelector(selectSidebarItems);
  const appMode = useAppSelector(selectAppMode);

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elemType: string
  ) => {
    e.dataTransfer.setData("elemType", elemType);
  };

  const classNames = clsx(styles.sidebar, {
    [styles.sidebar__disabled]: appMode === "runtime",
  });

  return (
    <div className={classNames}>
      {sidebarItems.map(({ id, type, isOnCalc }) => (
        <SidebarElement
          draggable
          key={id}
          data={itemsData[type as keyof typeof itemsData]}
          isGrid={type === "numbers"}
          isDisplay={type === "display"}
          onDragStart={(e) => onDragStart(e, type)}
          isOnCalc={isOnCalc}
          isDisabled={isOnCalc}
        />
      ))}
    </div>
  );
};
