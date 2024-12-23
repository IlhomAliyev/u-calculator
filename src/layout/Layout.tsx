import { Calculator } from "@/modules/calculator";
import { Sidebar } from "@/modules/sidebar";
import styles from "./styles.module.scss";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Calculator />
    </div>
  );
};
