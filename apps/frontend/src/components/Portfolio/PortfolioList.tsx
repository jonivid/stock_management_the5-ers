import { observer } from "mobx-react-lite";
import { List, Skeleton } from "antd";
import { PortfolioItem } from "./PortfolioItem";

export const PortfolioList = observer(({ symbols }: { symbols: string[] }) => {
  return (
    <List
      dataSource={symbols}
      renderItem={(symbol) => <PortfolioItem key={symbol} symbol={symbol} />}
      bordered
      style={{ background: "#fff" }}
    />
  );
});
