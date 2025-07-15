export interface AuthField {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  rules?: any[];
  dependencies?: string[];
  validator?: (getFieldValue: (name: string) => any) => any;
}

export interface AuthFormProps {
  title: string;
  fields: AuthField[];
  onFinish: (values: any) => void;
  submitText: string;
  loading: boolean;
  error?: string | null;
  footer?: React.ReactNode;
}
