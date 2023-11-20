import { Carousel, Col, Layout, Row } from "antd";
import BannerIcon from "../../assets/icons/banner.svg";
import RegisterIcon from "../../assets/icons/register.svg";
import CheckIcon from "../../assets/icons/check.svg";
import SwapIcon from "../../assets/icons/swap.svg";
import "./index.scss";
const { Content } = Layout;

const Banner = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <>
      <div className="banner-wrapper">
        <Carousel afterChange={onChange}>
          <img className="banner-img" src={BannerIcon} loading="eager" />
          <img className="banner-img" src={BannerIcon} loading="eager" />
          <img className="banner-img" src={BannerIcon} loading="eager" />
          <img className="banner-img" src={BannerIcon} loading="eager" />
        </Carousel>
        <div className="banner-text">
          <h2>Trải nghiệm sống cực chất cho dân văn phòng</h2>
          <h4>Lương từ 8 triệu/tháng, nhận ngay tới 200 triệu VND</h4>
          <button className="buy-now">Mua ngay</button>
        </div>
        <div className="banner-bg">
          <Row>
            <Col xs={0} sm={2}></Col>
            <Col xs={24} sm={20}>
              <Content>
                <div className="wrapper-main">
                  <Row>
                    <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6}>
                      <div className="item-main">
                        <h2 className="why-choose">
                          Vì sao nên chọn chúng tôi
                        </h2>
                      </div>
                    </Col>
                    <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6}>
                      <div className="item-main">
                        <img src={RegisterIcon} />
                        <div className="title-item">100% online</div>
                        <div className="sub-title-item">
                          Đăng ký và nộp hồ sơ trực tuyến
                        </div>
                      </div>
                    </Col>

                    <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6}>
                      <div className="item-main">
                        <img src={CheckIcon} />
                        <div className="title-item">Phê duyệt siêu tốc</div>
                        <div className="sub-title-item">
                          Duyệt hồ sơ nhanh trong 5 phút
                        </div>
                      </div>
                    </Col>
                    <Col span={6} xs={24} sm={12} md={12} lg={6} xl={6}>
                      <div className="item-main">
                        <img src={SwapIcon} />
                        <div className="title-item">Sử dụng linh hoạt</div>
                        <div className="sub-title-item">
                          Dễ dàng chuyển đổi linh hoạt giữa các sản phẩm
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Content>
            </Col>
            <Col xs={0} sm={2}></Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default Banner;
