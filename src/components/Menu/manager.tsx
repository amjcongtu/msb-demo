import { Dropdown, MenuProps, Space, Avatar, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import { UserOutlined } from "@ant-design/icons";
import DownIcon from "../../assets/icons/down.svg";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../services/queries/useProfile";
import { PATHS } from "../../router/routePaths";
import { getCookieStorage } from "../../helper/storage";
import "./manager.scss";

const Manager = () => {
  const { clearAuth } = useAuth();
  const userId = getCookieStorage("userId");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading }: any = useProfile(Number(userId));
  const navigate = useNavigate();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const { key } = e;
    switch (key) {
      case "MANAGER":
        navigate(PATHS.profile());
        break;

      case "LOG_OUT":
        clearAuth();
        break;

      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Quản lý tài khoản",
      key: "MANAGER",
    },
    {
      label: "Đăng xuất",
      key: "LOG_OUT",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div className="manager-wrapper">
        <Dropdown menu={menuProps}>
          <Space direction="vertical" size={16}>
            <Space wrap size={16}>
              <div className="line"></div>
              <Avatar size={32} icon={<UserOutlined />} />
              {isLoading ? (
                <Skeleton.Input />
              ) : (
                <div>
                  {get(data, "firstName", "")} {get(data, "lastName", "")}
                </div>
              )}
              <img className="icon-submenu" src={DownIcon} />
            </Space>
            <Space wrap size={16}></Space>
          </Space>
        </Dropdown>
      </div>
    </>
  );
};
export default Manager;
