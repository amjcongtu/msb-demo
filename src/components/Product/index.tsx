import { Col, Row } from "antd";
import get from "lodash/get";
import { useGetProduct } from "../../services/queries/useProduct";
import { ProductEntry } from "../../interface/product";
import RightIcon from "../../assets/icons/right.svg";
import "./main.scss";
import LoadingPage from "../Loading";

const Product = () => {
  const { data, isLoading } = useGetProduct();
  const list = get(data, "products", []);

  return (
    <div className="main-wrapper-product">
      <Row>
        <Col xs={1} sm={2}></Col>
        <Col xs={22} sm={20}>
          <h2 className="title-product">Danh sách sản phẩm</h2>
        </Col>
        <Col xs={1} sm={2}></Col>
      </Row>
      <Row>
        <Col xs={1} sm={2}></Col>
        <Col xs={22} sm={20}>
          <Row gutter={[24, 24]}>
            {isLoading ? (
              <LoadingPage />
            ) : (
              list &&
              list.map((item: ProductEntry) => {
                return (
                  <Col
                    key={item.id}
                    span={8}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                  >
                    <div className="box-product">
                      <img
                        className="img-product"
                        src={item.thumbnail}
                        alt=""
                      />
                      <div className="content-product">
                        <div className="text-product">
                          <div className="title">{item.title}</div>
                          <div className="description">{item.description}</div>
                        </div>
                        <div className="action">
                          <span className="text-btn">Khám phá ngay</span>
                          <img src={RightIcon} alt="" />
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            )}
          </Row>
        </Col>
        <Col xs={1} sm={2}></Col>
      </Row>
    </div>
  );
};
export default Product;
