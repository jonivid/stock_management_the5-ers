import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useAuth } from "../../stores/useAuth";
import { COMPANY_NAME } from "../../constants";

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoggedIn && (
        <Sider breakpoint="lg" collapsedWidth="0">
          <div
            style={{
              height: 64,
              background: "rgba(255,255,255,0.2)",
              margin: 16,
              borderRadius: 8,
              textAlign: "center",
              lineHeight: "64px",
              fontWeight: 700,
            }}
          >
            {COMPANY_NAME}
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            <Menu.Item key="/portfolio">
              <Link to="/portfolio">Portfolio</Link>
            </Menu.Item>
            {/* Add more nav items here */}
            <Menu.Item
              key="logout"
              onClick={logout}
              style={{ position: "absolute", bottom: 0, width: "100%" }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            <Link to="/">{COMPANY_NAME}</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ThemeToggle />
            {isLoggedIn && user && (
              <span style={{ marginLeft: 16 }}>{user.email}</span>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: 0,
            padding: 24,
            minHeight: 280,
            background: "#f5f6fa",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
