import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/useAuth";
import { COMPANY_NAME } from "../../constants";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const { Header, Sider, Content } = Layout;

const AppLayoutComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const { isLoggedIn, user } = auth;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isLoggedIn &&
      (location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/")
    ) {
      navigate("/portfolio", { replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/portfolio",
      label: <Link to="/portfolio">Portfolio</Link>,
    },
  ];

  return (
    <Layout style={{ height: "100%" }}>
      {isLoggedIn && (
        <Sider width={240} style={{ height: "100%", overflowY: "auto" }}>
          <div className="sidenav-logo">{COMPANY_NAME}</div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ borderRight: 0 }}
            items={menuItems}
          />
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
            height: 64,
            flexShrink: 0,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            <Link to="/">{COMPANY_NAME}</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {isLoggedIn && user && (
              <>
                <span style={{ marginLeft: 16 }}>{user.email}</span>
                <button style={{ marginLeft: 16 }} onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            overflowY: "auto",
            height: "calc(100% - 64px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export const AppLayout = observer(AppLayoutComponent);
