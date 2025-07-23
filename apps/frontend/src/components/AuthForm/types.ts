import type { Rule } from "antd/es/form";

export interface AuthField {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  rules?: Rule[];
  dependencies?: string[];
}

export interface AuthFormValues {
  email: string;
  password: string;
  confirm: string;
}

export interface AuthFormProps {
  title: string;
  fields: AuthField[];
  onFinish: (values: AuthFormValues) => void;
  submitText: string;
  loading: boolean;
  error?: string | null;
  footer?: React.ReactNode;
}
