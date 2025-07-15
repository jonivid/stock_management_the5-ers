import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../stores/portfolioStore";
import { PortfolioList } from "../components/Portfolio/PortfolioList";
import { StockSearch } from "../components/Portfolio/StockSearch";
import { Spin, Alert, Empty, Segmented, Input } from "antd";

const SECTION_HEADER_HEIGHT = 40; // px
const SEARCH_CONTROLS_HEIGHT = 48; // px (approximate height of Segmented + Input)

const sectionHeaderStyle = {
  height: SECTION_HEADER_HEIGHT,
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  fontSize: 18,
  borderBottom: "1px solid #eee",
  marginBottom: 0,
  paddingLeft: 8,
  paddingRight: 8,
};

const PortfolioPage = observer(() => {
  const store = usePortfolioStore();
  const [searchType, setSearchType] = useState("symbol");
  const [query, setQuery] = useState("");

  useEffect(() => {
    store.fetchPortfolio();
  }, [store]);

  return (
    <div
      style={{
        height: "92vh",
        display: "flex",
        flexDirection: "column",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: 16 }}>Portfolio Management</h2>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          gap: 24,
        }}
      >
        {/* Search Section */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div style={sectionHeaderStyle}>Search Stocks</div>
          <div
            style={{
              height: SEARCH_CONTROLS_HEIGHT,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 8px 8px 8px",
              borderBottom: "1px solid #eee",
              marginBottom: 0,
            }}
          >
            <Segmented
              options={[
                { label: "Symbol", value: "symbol" },
                { label: "Name", value: "name" },
              ]}
              value={searchType}
              onChange={(val) => setSearchType(val as string)}
            />
            <Input.Search
              placeholder={`Search stocks by ${searchType}`}
              allowClear
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: 260 }}
            />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: 8 }}>
            <StockSearch
              query={query}
              setQuery={setQuery}
              searchType={searchType}
              setSearchType={setSearchType}
            />
          </div>
        </div>
        {/* Portfolio Section */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div style={sectionHeaderStyle}>Your Portfolio</div>
          {/* Spacer to match search controls height */}
          <div
            style={{
              height: SEARCH_CONTROLS_HEIGHT,
              borderBottom: "1px solid #eee",
            }}
          />
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: 8 }}>
            {store.loading ? (
              <Spin
                size="large"
                style={{ display: "block", margin: "40px auto" }}
              />
            ) : store.error ? (
              <Alert
                type="error"
                message={store.error}
                showIcon
                style={{ margin: "24px 0" }}
              />
            ) : store.portfolio.length === 0 ? (
              <Empty
                description="No stocks in your portfolio yet."
                style={{ margin: "40px 0" }}
              />
            ) : (
              <PortfolioList symbols={store.portfolio} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PortfolioPage;
