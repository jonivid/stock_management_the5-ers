import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAuth } from "../stores/useAuth";
import { AuthForm } from "../components/AuthForm/AuthForm";
import type { AuthField } from "../components/AuthForm/types";
import { COMPANY_NAME } from "../constants";
import { useAxios } from "../hooks/useAxios";

interface SignupResponse {
  email: string;
  id: string;
}

const Signup = observer(() => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { loading, request } = useAxios<SignupResponse>();

  if (auth.isLoggedIn) {
    navigate("/portfolio", { replace: true });
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
      autoComplete: "new-password",
      rules: [{ required: true, message: "Please enter your password" }],
    },
    {
      label: "Confirm Password",
      name: "confirm",
      type: "password",
      autoComplete: "new-password",
      dependencies: ["password"],
      rules: [
        { required: true, message: "Please confirm your password" },
        ({ getFieldValue }: any) => ({
          validator(_: any, value: string) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match"));
          },
        }),
      ],
    },
  ];

  const onFinish = async (values: {
    email: string;
    password: string;
    confirm: string;
  }) => {
    setError(null);
    const res = await request({
      url: "/users/signup",
      method: "POST",
      data: { email: values.email, password: values.password },
    });
    if (res && res.id && res.email) {
      navigate("/login");
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <AuthForm
      title={`Sign Up for ${COMPANY_NAME}`}
      fields={fields}
      onFinish={onFinish}
      submitText="Sign Up"
      loading={loading}
      error={error}
      footer={
        <>
          Already have an account? <Link to="/login">Login</Link>
        </>
      }
    />
  );
});

export default Signup;
