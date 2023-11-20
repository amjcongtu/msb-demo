import { Col, Row } from "antd";
import "./index.scss";
const Footer = () => {
  return (
    <>
      <Row >
        <Col xs={24} sm={24}>
            <div className="footer">
              <Col xs={24} sm={2}></Col>
              <Col span={14} xs={24} sm={14} md={14} lg={14} xl={14}>
                <div className="license">
                  Bản quyền © 2021 thuộc về Ngân hàng TMCP Hàng Hải Việt Nam MSB
                </div>
              </Col>
              <Col span={6} xs={24} sm={6} md={6} lg={6} xl={6}>
                <div className="footer-link">
                  <div className="footer-link-text">Điều khoản dịch vụ</div>
                  <div className="footer-link-text">Ngân hàng điện tử</div>
                </div>
              </Col>
              <Col xs={24} sm={2}></Col>
            </div>
        </Col>
      </Row>
    </>
  );
};
export default Footer;
