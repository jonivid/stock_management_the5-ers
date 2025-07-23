import React from "react";
import { observer } from "mobx-react-lite";
import { List, Button, Tag, Spin, Alert, Empty } from "antd";
import { usePortfolioStore } from "../../stores/portfolioStore";
import useDebounce from "../../hooks/useDebounce";
import { axiosInstance } from "../../services/axiosInstance";

interface StockSearchProps {
  query: string;
  setQuery: (q: string) => void;
  searchType: string;
  setSearchType: (t: string) => void;
}

export const StockSearch = observer(
  ({ query, searchType }: StockSearchProps) => {
    const portfolioStore = usePortfolioStore();
    const debouncedQuery = useDebounce(query, 400);
    const [results, setResults] = React.useState<Array<{ symbol: string; name: string; exchange?: string }> | string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (!debouncedQuery.trim()) {
        setResults(null);
        setError(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      setResults(null);
      const fetchResults = async () => {
        try {
          const endpoint =
            searchType === "symbol"
              ? "/fmp-client/search-symbol"
              : "/fmp-client/search-name";
          const res = await axiosInstance.get(endpoint, {
            params: { query: debouncedQuery.trim() },
          });
          setResults(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
          setError(
            errorObj.response?.data?.message || errorObj.message || "Unknown error"
          );
          setResults("");
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }, [debouncedQuery, searchType]);

    const handleAdd = async (symbol: string) => {
      await portfolioStore.addStock(symbol);
    };

    const portfolioSymbols = portfolioStore.portfolio;

    if (!query.trim()) return null;

    return (
      <>
        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        {loading && <Spin style={{ display: "block", margin: "24px auto" }} />}
        {results && Array.isArray(results) && results.length > 0 && (
          <List
            bordered
            dataSource={results}
            style={{ background: "#fff", maxHeight: 320, overflowY: "auto" }}
            renderItem={(item) => {
              const inPortfolio = portfolioSymbols.includes(item.symbol);
              return (
                <List.Item
                  actions={[
                    inPortfolio ? (
                      <Tag color="green" key="in-portfolio">
                        In Portfolio
                      </Tag>
                    ) : (
                      <Button
                        type="primary"
                        size="small"
                        disabled={inPortfolio || portfolioStore.loading}
                        loading={portfolioStore.loading}
                        onClick={() => handleAdd(item.symbol)}
                        key="add"
                      >
                        Add
                      </Button>
                    ),
                  ]}
                >
                  <span style={{ fontWeight: 600 }}>{item.symbol}</span>
                  <span style={{ marginLeft: 12, color: "#888" }}>
                    {item.name}
                  </span>
                  {item.exchange && (
                    <span
                      style={{ marginLeft: 12, color: "#aaa", fontSize: 12 }}
                    >
                      {item.exchange}
                    </span>
                  )}
                </List.Item>
              );
            }}
          />
        )}
        {results &&
          Array.isArray(results) &&
          results.length === 0 &&
          !loading && (
            <Empty
              description="No results found."
              style={{ margin: "24px 0" }}
            />
          )}
        {typeof results === "string" && !loading && !error && (
          <Alert
            type="info"
            message={results}
            showIcon
            style={{ marginTop: 16 }}
          />
        )}
      </>
    );
  }
);
