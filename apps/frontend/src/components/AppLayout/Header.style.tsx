import styled from "styled-components";
import { Layout } from "antd";

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px #f0f1f2;
  height: 64px;
  flex-shrink: 0;
`;
