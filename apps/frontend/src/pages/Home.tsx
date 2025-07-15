import { Button, Typography, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "../constants";
import "./Home.css";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="home-hero">
      <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card variant="borderless" className="home-hero-card">
            <Title level={1} style={{ textAlign: "center" }}>
              Welcome to {COMPANY_NAME}
            </Title>
            <Paragraph style={{ textAlign: "center", fontSize: 18 }}>
              Manage your stock portfolio with ease. Search, track, and analyze
              stocks in real time.
              <br />
              Secure, fast, and beautifully simple.
            </Paragraph>
            <Row justify="center" gutter={16} style={{ marginTop: 32 }}>
              <Col>
                <Link to="/login">
                  <Button type="primary" size="large">
                    Login
                  </Button>
                </Link>
              </Col>
              <Col>
                <Link to="/signup">
                  <Button size="large">Sign Up</Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
