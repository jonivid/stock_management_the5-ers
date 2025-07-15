import { useState } from "react";
import { Input, Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../../stores/portfolioStore";

export const AddStockForm = observer(() => {
  const store = usePortfolioStore();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: { symbol: string }) => {
    setSubmitting(true);
    await store.addStock(values.symbol.trim().toUpperCase());
    setSubmitting(false);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      style={{ marginBottom: 24 }}
    >
      <Form.Item
        name="symbol"
        rules={[
          { required: true, message: "Please enter a stock symbol" },
          { pattern: /^[A-Za-z.]+$/, message: "Invalid symbol" },
        ]}
      >
        <Input placeholder="Add symbol (e.g. AAPL)" autoComplete="off" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting || store.loading}
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
});
