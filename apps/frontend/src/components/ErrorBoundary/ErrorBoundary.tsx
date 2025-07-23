import React from "react";
import { Result, Button } from "antd";
import type { ErrorBoundaryState } from "./types";

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong."
          subTitle="An unexpected error occurred. Please try again."
          extra={
            <Button type="primary" onClick={this.handleReload}>
              Reload
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}
