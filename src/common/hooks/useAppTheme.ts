import { selectAppTheme, setAppTheme } from "@/app/slice";
import { AppTheme } from "@/app/types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useAppTheme = () => {
  const dispatch = useAppDispatch();
  const appTheme = useAppSelector(selectAppTheme);

  const onThemeChange = (theme: AppTheme) => {
    dispatch(setAppTheme(theme));
    document.body.dataset.theme = theme;
  };

  return { appTheme, onThemeChange };
};
