import { Descriptions, Typography } from "antd";

const { Text } = Typography;

export interface StockDetailProps {
  detail: {
    name: string;
    price: number;
    changePercentage: number;
    dayLow: number;
    dayHigh: number;
    yearLow: number;
    yearHigh: number;
    volume: number;
    marketCap: number;
    avgPrice50: number;
    avgPrice200: number;
    open: number;
    previousClose: number;
  };
}

export const StockDetail = ({ detail }: StockDetailProps) => (
  <Descriptions bordered column={1} size="middle" style={{ marginTop: 16 }}>
    <Descriptions.Item label="Name">{detail.name}</Descriptions.Item>
    <Descriptions.Item label="Price">
      <Text strong>${detail.price}</Text>
    </Descriptions.Item>
    <Descriptions.Item label="Change %">
      <Text
        strong
        type={
          detail.changePercentage > 0
            ? "success"
            : detail.changePercentage < 0
            ? "danger"
            : undefined
        }
      >
        {detail.changePercentage > 0 ? "+" : ""}
        {detail.changePercentage}%
      </Text>
    </Descriptions.Item>
    <Descriptions.Item label="Day Low">${detail.dayLow}</Descriptions.Item>
    <Descriptions.Item label="Day High">${detail.dayHigh}</Descriptions.Item>
    <Descriptions.Item label="Year Low">${detail.yearLow}</Descriptions.Item>
    <Descriptions.Item label="Year High">${detail.yearHigh}</Descriptions.Item>
    <Descriptions.Item label="Volume">{detail.volume}</Descriptions.Item>
    <Descriptions.Item label="Market Cap">
      ${detail.marketCap}
    </Descriptions.Item>
    <Descriptions.Item label="50d Avg Price">
      ${detail.avgPrice50}
    </Descriptions.Item>
    <Descriptions.Item label="200d Avg Price">
      ${detail.avgPrice200}
    </Descriptions.Item>
    <Descriptions.Item label="Open">${detail.open}</Descriptions.Item>
    <Descriptions.Item label="Previous Close">
      ${detail.previousClose}
    </Descriptions.Item>
  </Descriptions>
);
