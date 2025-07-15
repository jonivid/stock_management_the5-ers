import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAuth } from "../stores/useAuth";
import { AuthForm } from "../components/AuthForm/AuthForm";
import type { AuthField } from "../components/AuthForm/types";
import { COMPANY_NAME } from "../constants";
import { useAxios } from "../hooks/useAxios";

interface LoginResponse {
  access_token: string;
  user: { email: string };
}

const Login = observer(() => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { loading, request } = useAxios<LoginResponse>();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/portfolio", { replace: true });
    }
  }, [auth.isLoggedIn, navigate]);

  if (auth.isLoggedIn) {
    return null;
  }

  const fields: AuthField[] = [
    {
      label: "Email",
      name: "email",
      type: "email",
      autoComplete: "email",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Invalid email" },
      ],
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      autoComplete: "current-password",
      rules: [{ required: true, message: "Please enter your password" }],
    },
  ];

  const onFinish = async (values: { email: string; password: string }) => {
    setError(null);
    const res = await request({
      url: "/auth/login",
      method: "POST",
      data: values,
    });
    if (res && res.access_token && res.user) {
      auth.login(res.user.email, res.access_token);
      navigate("/portfolio");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <AuthForm
      title={`Login to ${COMPANY_NAME}`}
      fields={fields}
      onFinish={onFinish}
      submitText="Login"
      loading={loading}
      error={error}
      footer={
        <>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </>
      }
    />
  );
});

export default Login;
