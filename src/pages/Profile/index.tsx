import { Breadcrumb, Card, Col, List, Row } from "antd";
import get from "lodash/get";
import { useState } from "react";
import { getCookieStorage } from "../../helper/storage";
import { useProfile } from "../../services/queries/useProfile";
import LoadingPage from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import UserIcon from "../../assets/icons/user.svg";
import InfoIcon from "../../assets/icons/info.svg";
import LogoutIcon from "../../assets/icons/logout.svg";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router/routePaths";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabPanel = ({ activeTab, tabKey, children }: any) => {
  return activeTab === tabKey ? children : null;
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const handleClick = (key: string) => {
    setActiveTab(key);
  };
  const userId = getCookieStorage("userId");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading }: any = useProfile(Number(userId));

  return (
    <>
      <div className="profile">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <Row>
              <Col xs={0} sm={2}></Col>
              <Col xs={24} sm={20}>
                <Breadcrumb
                  className="breadcrumb-profile"
                  items={[
                    {
                      title: "Trang chủ",
                      className: "breadcrumb",
                      onClick: () => {
                        navigate(PATHS.home());
                      },
                    },
                    {
                      title: "Quản lý tài khoản",
                      className: "breadcrumb-active ",
                    },
                  ]}
                />
                <Row gutter={10}>
                  <Col span={8} xs={24} md={8}>
                    <List
                      grid={{
                        xs: 24,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1,
                      }}
                    >
                      <List.Item>
                        <Card
                          bodyStyle={{ padding: "0" }}
                          title={`${get(data,'firstName','')} ${get(data,'lastName','lastName')}`}
                        >
                          <div
                            className={
                              activeTab === "1"
                                ? "info-line active-tab"
                                : "info-line"
                            }
                            onClick={() => handleClick("1")}
                          >
                            <div className="row-info-profile">
                              <img src={UserIcon} alt="" />
                              <div>Thông tin tài khoản</div>
                            </div>
                          </div>
                          <div
                            className={
                              activeTab === "2"
                                ? "info-line active-tab"
                                : "info-line"
                            }
                            onClick={() => handleClick("2")}
                          >
                            <div className="row-info-profile">
                              <img src={InfoIcon} alt="" />
                              <div>Thông tin sản phẩm</div>
                            </div>
                          </div>
                          <div className="info-line" onClick={clearAuth}>
                            <div className="row-info-profile">
                              <img src={LogoutIcon} alt="" />
                              <div> Đăng xuất</div>
                            </div>
                          </div>
                        </Card>
                      </List.Item>
                    </List>
                  </Col>
                  <Col span={16} xs={24} md={16}>
                    <TabPanel activeTab={activeTab} tabKey="1">
                      <List
                        grid={{
                          xs: 24,
                          sm: 1,
                          md: 1,
                          lg: 1,
                          xl: 1,
                          xxl: 1,
                        }}
                      >
                        <List.Item>
                          <Card title={"Thông tin chung"}>
                            <Row gutter={30} className="custom-row">
                              <Col span={6} xs={12} md={6}>
                                <span className="info-label">Họ và tên</span>
                              </Col>
                              <Col span={18} xs={12} md={18}>
                                <span className="info-data">
                                  {get(data, "firstName", "")}{" "}
                                  {get(data, "lastName", "")}
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={30} className="custom-row">
                              <Col span={6} xs={12} md={6}>
                                <span className="info-label">Số CMND/CCCD</span>
                              </Col>
                              <Col span={18} xs={12} md={18}>
                                <span className="info-data">
                                  {get(data, "ssn", "")}
                                </span>
                              </Col>
                            </Row>
                            <Row gutter={30} className="custom-row">
                              <Col span={6} xs={12} md={6}>
                                <span className="info-label">
                                  Số điện thoại
                                </span>
                              </Col>
                              <Col span={18} xs={12} md={18}>
                                <span className="info-data">
                                  {get(data, "phone", "")}
                                </span>
                              </Col>
                            </Row>
                          </Card>
                        </List.Item>
                      </List>
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabKey="2">
                      <List
                        grid={{
                          xs: 1,
                          sm: 1,
                          md: 1,
                          lg: 1,
                          xl: 1,
                          xxl: 1,
                        }}
                      >
                        <List.Item>
                          <Card title={"Thông tin sản phẩm"}></Card>
                        </List.Item>
                      </List>
                    </TabPanel>
                  </Col>
                </Row>
              </Col>
              <Col xs={0} sm={2}></Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
