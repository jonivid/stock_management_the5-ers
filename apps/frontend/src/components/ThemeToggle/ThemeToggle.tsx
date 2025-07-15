import { Switch } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { useTheme } from "../../theme/useTheme";

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <Switch
      checked={mode === "dark"}
      onChange={toggleTheme}
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
      title="Toggle dark mode"
    />
  );
};
