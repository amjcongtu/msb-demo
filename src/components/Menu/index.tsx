import { Col, Drawer, Row } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import { Menu } from "antd";
import Manager from "./manager";
import Request from "../Request";
import Login from "../Login";
import LogoIcon from "../../assets/icons/logo.svg";
import PhoneIcon from "../../assets/icons/phone.svg";
import DownIcon from "../../assets/icons/down.svg";
import { MenuOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { useMenu } from "../../services/queries/useMenu";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router/routePaths";
import { MenuEntry, Submenu } from "../../interface/menu";
import "./menu.scss";

const { SubMenu } = Menu;

const MenuCustom = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: menuData, isLoading } = useMenu();
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuItemClick = (key: any) => {
    setSelectedKeys([key]);
  };

  const handleLoginClick = () => {
    setOpenLogin(true);
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSelectedKeys([]);
  }, [isAuth]);

  const renderSubMenu = (submenuData: Submenu) => {
    if (!submenuData.children) {
      return <Menu.Item key={submenuData.key}>{submenuData.label} </Menu.Item>;
    }

    return (
      <SubMenu key={submenuData.key} title={submenuData.label}>
        {submenuData.children.map((subItem) => renderSubMenu(subItem))}
      </SubMenu>
    );
  };

  const renderMenu = (menuData: MenuEntry[]) => {
    return menuData.map((menuItem) => {
      if (!menuItem.children) {
        return (
          <Menu.Item
            style={
              menuItem.key === "login" && isAuth
                ? { display: "none" }
                : { display: "block" }
            }
            key={menuItem.label}
            onClick={menuItem.key === "login" ? handleLoginClick : undefined}
            icon={menuItem.key === "phone" && <img src={PhoneIcon} />}
          >
            {menuItem.label}
          </Menu.Item>
        );
      }

      return (
        <SubMenu
          key={menuItem.label}
          title={
            <span className="menu-item">
              {menuItem.label}{" "}
              {menuItem.children.length > 0 && (
                <img className="icon-submenu" src={DownIcon} />
              )}
            </span>
          }
        >
          {menuItem.children.map((subItem) => renderSubMenu(subItem))}
        </SubMenu>
      );
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="menu-wrapper">
          <div className="row-flex">
            <div
              className="logo-menu"
              onClick={() => {
                navigate(PATHS.home());
              }}
            >
              <img src={LogoIcon} />
            </div>
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="row-flex-end ">
                  {!isMobile && !isLoading && (
                    <Menu
                      mode="horizontal"
                      selectedKeys={selectedKeys}
                      onClick={({ key }) => handleMenuItemClick(key)}
                      expandIcon={
                        <span className="icon-container">
                          <img
                            className="icon-down-submenu"
                            src={DownIcon}
                            alt="Down Icon"
                          />
                        </span>
                      }
                    >
                      {renderMenu(menuData)}
                    </Menu>
                  )}

                  <div className="box-action">
                    <button className="btn-quest" onClick={showDrawer}>
                      Yêu cầu tư vấn
                    </button>
                    {isMobile && (
                      <div className="menu-icon-mobile">
                        <MenuOutlined
                          onClick={() => {
                            setOpenMenu(true);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {isAuth && <Manager />}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {isMobile && (
        <Drawer
          title=""
          placement="right"
          closable={true}
          onClose={() => {
            setOpenMenu(false);
          }}
          open={openMenu}
        >
          {!isLoading && (
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              onClick={({ key }) => handleMenuItemClick(key)}
            >
              {renderMenu(menuData)}
            </Menu>
          )}
        </Drawer>
      )}
      <Login isOpen={isOpenLogin} setIsOpen={setOpenLogin} />
      <Request open={open} setOpen={onClose} />
    </>
  );
};

export default MenuCustom;
