import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../stores/portfolioStore";
import { Card, Typography, Spin, Alert, Button } from "antd";
import { useEffect } from "react";
import { StockDetail } from "../components/StockDetail/StockDetail";

interface StockDetailPageProps {}

const { Title } = Typography;

const StockDetailPage = observer(({}: StockDetailPageProps) => {
  const { symbol } = useParams<{ symbol: string }>();
  const store = usePortfolioStore();

  useEffect(() => {
    if (
      symbol &&
      !store.stockDetails[symbol] &&
      !store.stockDetailsLoading[symbol]
    ) {
      store.fetchStockDetail(symbol);
    }
  }, [symbol, store]);

  const detail = symbol ? store.stockDetails[symbol] : null;
  const loading = symbol ? store.stockDetailsLoading[symbol] : false;
  const error = symbol ? store.stockDetailsError[symbol] : null;

  return (
    <Card style={{ maxWidth: 600, margin: "32px auto" }}>
      <Link
        to="/portfolio"
        style={{ display: "inline-block", marginBottom: 16 }}
      >
        <Button type="link">← Back to Portfolio</Button>
      </Link>
      <Title level={3} style={{ marginBottom: 0 }}>
        {symbol}
      </Title>
      {loading && <Spin style={{ margin: "32px 0" }} />}
      {error && (
        <Alert
          type="error"
          message={error}
          showIcon
          style={{ margin: "16px 0" }}
        />
      )}
      {detail && <StockDetail detail={detail} />}
    </Card>
  );
});

export default StockDetailPage;
