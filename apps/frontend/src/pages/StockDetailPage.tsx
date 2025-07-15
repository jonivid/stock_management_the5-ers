import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../stores/portfolioStore";
import { Card, Typography, Alert, Button } from "antd";
import { useEffect } from "react";
import { StockDetail } from "../components/StockDetail/StockDetail";
import { StockDetailSkeleton } from "../components/StockDetail/StockDetailSkeleton";

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
      {loading && (
        <div style={{ margin: "32px 0" }}>
          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: 8,
              padding: 24,
              background: "#fff",
            }}
          >
            <StockDetailSkeleton />
          </div>
        </div>
      )}
      {error && (
        <div style={{ margin: "16px 0", textAlign: "center" }}>
          <Alert
            type="error"
            message={
              <>
                Failed to load stock details. Please try again.
                <br />
                <span style={{ fontSize: 12, color: "#888" }}>{error}</span>
              </>
            }
            showIcon
            style={{ marginBottom: 16 }}
          />
          {symbol && (
            <button
              onClick={() => store.fetchStockDetail(symbol)}
              style={{ marginTop: 8 }}
            >
              Retry
            </button>
          )}
        </div>
      )}
      {detail && <StockDetail detail={detail} />}
    </Card>
  );
});

export default StockDetailPage;
