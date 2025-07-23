import { Form, Input, Button, Typography, Alert } from "antd";
import type { AuthFormProps } from "./types";
import type { RuleObject } from "antd/es/form";

const { Title } = Typography;

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  onFinish,
  submitText,
  loading,
  error,
  footer,
}) => (
  <div style={{ maxWidth: 400, margin: "48px auto" }}>
    <Title level={2} style={{ textAlign: "center" }}>
      {title}
    </Title>
    {error && (
      <Alert type="error" message={error} style={{ marginBottom: 16 }} />
    )}
    <Form layout="vertical" onFinish={onFinish} autoComplete="off">
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          dependencies={field.dependencies}
          rules={
            field.name === "confirm"
              ? [
                  ...(field.rules || []),
                  ({ getFieldValue }) => ({
                    validator(_: RuleObject, value: string) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]
              : field.rules
          }
        >
          {field.type === "password" ? (
            <Input.Password autoComplete={field.autoComplete} />
          ) : (
            <Input
              autoFocus={field.name === "email"}
              autoComplete={field.autoComplete}
              type={field.type || "text"}
            />
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
    {footer && (
      <div style={{ textAlign: "center", marginTop: 16 }}>{footer}</div>
    )}
  </div>
);
