import { Button, List } from "antd";
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../../stores/portfolioStore";

export const PortfolioItem = observer(({ symbol }: { symbol: string }) => {
  const store = usePortfolioStore();
  const handleRemove = () => {
    store.removeStock(symbol);
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
    >
      <span style={{ fontWeight: 500 }}>{symbol}</span>
    </List.Item>
  );
});
