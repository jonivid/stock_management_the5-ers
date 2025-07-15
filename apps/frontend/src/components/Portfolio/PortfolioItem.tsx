import { Button, List } from "antd";
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../../stores/portfolioStore";
import { useNavigate } from "react-router-dom";
import type { PortfolioItemProps } from "./types";
import styles from "./PortfolioItem.module.css";

export const PortfolioItem = observer(({ symbol }: PortfolioItemProps) => {
  const store = usePortfolioStore();
  const navigate = useNavigate();
  const handleRemove = () => {
    store.removeStock(symbol);
  };
  const handleItemClick = (e: React.MouseEvent) => {
    // Prevent navigation if Remove button is clicked
    if ((e.target as HTMLElement).closest("button")) return;
    navigate(`/stock/${symbol}`);
  };
  return (
    <List.Item
      actions={[
        <Button
          danger
          size="small"
          loading={store.loading}
          onClick={handleRemove}
          key="remove"
        >
          Remove
        </Button>,
      ]}
      onClick={handleItemClick}
      style={{ cursor: "pointer" }}
    >
      <span className={styles.symbol}>{symbol}</span>
    </List.Item>
  );
});
