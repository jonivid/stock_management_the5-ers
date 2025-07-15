import { Descriptions, Skeleton } from "antd";

export const StockDetailSkeleton = () => (
  <Descriptions bordered column={1} size="middle" style={{ marginTop: 0 }}>
    <Descriptions.Item label="Name">
      <Skeleton.Input style={{ width: 120 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Price">
      <Skeleton.Input style={{ width: 80 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Change %">
      <Skeleton.Input style={{ width: 60 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Day Low">
      <Skeleton.Input style={{ width: 80 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Day High">
      <Skeleton.Input style={{ width: 80 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Year Low">
      <Skeleton.Input style={{ width: 80 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Year High">
      <Skeleton.Input style={{ width: 80 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Volume">
      <Skeleton.Input style={{ width: 100 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Market Cap">
      <Skeleton.Input style={{ width: 120 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="50d Avg Price">
      <Skeleton.Input style={{ width: 100 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="200d Avg Price">
      <Skeleton.Input style={{ width: 100 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Open">
      <Skeleton.Input style={{ width: 80 }} active size="small" />
    </Descriptions.Item>
    <Descriptions.Item label="Previous Close">
      <Skeleton.Input style={{ width: 100 }} active size="small" />
    </Descriptions.Item>
  </Descriptions>
);
