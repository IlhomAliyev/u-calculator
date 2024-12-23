import { appThemes } from "@/common/constants";
import { useAppTheme } from "@/common/hooks";
import { Calculator } from "@/modules/calculator";
import { Sidebar } from "@/modules/sidebar";
import { CustomSwitch } from "@/ui/CustomSwitch";
import styles from "./styles.module.scss";

export const Layout = () => {
  const { appTheme, onThemeChange } = useAppTheme();

  return (
    <>
      <div className={styles.layout}>
        <Sidebar />
        <Calculator />
      </div>
      <CustomSwitch
        variants={appThemes}
        value={appTheme}
        onChange={onThemeChange}
        className={styles.themeSwitch}
      />
    </>
  );
};
