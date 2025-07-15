import { observer } from "mobx-react-lite";
import { List, Skeleton } from "antd";
import { PortfolioItem } from "./PortfolioItem";
import type { PortfolioListProps } from "./types";
import styles from "./PortfolioList.module.css";

export const PortfolioList = observer(({ symbols }: PortfolioListProps) => {
  return (
    <List
      dataSource={symbols}
      renderItem={(symbol) => <PortfolioItem key={symbol} symbol={symbol} />}
      bordered
      className={styles.listBackground}
    />
  );
});
