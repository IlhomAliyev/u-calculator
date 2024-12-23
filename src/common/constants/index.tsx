import MoonIcon from "@/assets/icons/moon-icon.svg?react";
import SunIcon from "@/assets/icons/sun-icon.svg?react";
import { Variant } from "@/ui/CustomSwitch";

export const itemsData = {
  display: ["0"],
  operators: ["/", "*", "-", "+"],
  numbers: ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."],
  equal: ["="],
};

export const appThemes: [Variant, Variant] = [
  {
    id: "light",
    label: "Light",
    icon: <SunIcon />,
  },
  {
    id: "dark",
    label: "Dark",
    icon: <MoonIcon />,
  },
];
