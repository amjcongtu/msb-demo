import {
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  Button,
  Drawer,
  Descriptions,
  Space,
  Row,
  Col,
} from "antd";
import { useState } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import "./index.scss";

const { Option } = Select;

interface Props {
  open: boolean;
  setOpen: (i: boolean) => void;
}

const Request = ({ open, setOpen }: Props) => {
  const [form] = Form.useForm(); 

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const [wardOptions, setWardOptions] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);
    onClose(); // Đóng Drawer sau khi submit
    form.resetFields();
    alert(JSON.stringify(values));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProvinceChange = (value: any) => {
    if (value === "HN") {
      setWardOptions(["Cầu Giấy", "Hoàn Kiếm"]);
    } else if (value === "HCM") {
      setWardOptions(["Quận 1", "Quận 2", "Quận 3"]);
    } else {
      setWardOptions([]);
    }
    // Đặt lại giá trị của "ward" trong form
    form.setFieldsValue({
      ward: undefined,
    });

    form.validateFields(["ward"]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateName = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(`Vui lòng nhập Họ tên`);
    }
    if (value.length > 100) {
      return Promise.reject("Tên không được vượt quá 100 ký tự");
    }
    if (value.trim() !== value) {
      return Promise.reject("Không được nhập dấu cách ở đầu và cuối chuỗi");
    }
    if (value.includes("  ")) {
      return Promise.reject("Không được nhập 2 dấu cách liền kề");
    }
    if (value.split(" ").length === 1 && !value.includes("'")) {
      return Promise.reject(
        "Vui lòng nhập họ và tên đầy đủ, có dấu cách ở giữa và chỉ chứa dấu nháy đơn."
      );
    }
    const isValid = /^[\p{L}\s']+$/u.test(value);
    if (!isValid) {
      return Promise.reject("Chỉ cho phép nhập chữ và dấu nháy đơn");
    }
    return Promise.resolve();
  };

  const validatePhoneNumber = () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validator(_: any, value: any) {
      if (!value) {
        return Promise.reject("Vui lòng nhập số điện thoại");
      }
      const isNumeric = /^\d+$/.test(value);
      const isTenDigit = value.length === 10;
      if (!isNumeric || !isTenDigit) {
        return Promise.reject("Vui lòng nhập số điện thoại hợp lệ");
      }
      return Promise.resolve();
    },
  });

  const drawerFooter = (
    <div style={{ textAlign: "right" }}>
      <Button
        className="submit-request"
        block
        size="large"
        type="primary"
        htmlType="submit"
        onClick={() => form.submit()}
      >
        Xác nhận
      </Button>
    </div>
  );
  return (
    <>
      <Drawer
        title="Yêu cầu tư vấn"
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"right"}
        footer={drawerFooter}
        extra={
          <Space onClick={onClose}>
            <img className="close-icon-request" src={CloseIcon} alt="" />
          </Space>
        }
        forceRender={true}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          name="requestForm"
        >
          <Descriptions title="Thông tin khách hàng" />
          <div className="name-input">
            <Form.Item
              label=""
              name="name"
              labelCol={{ xs: 12 }}
              rules={[
                { message: "Vui lòng nhập Họ tên" },
                { validator: validateName },
              ]}
            >
              <Input placeholder="Nhập họ và tên" size="large" />
            </Form.Item>
          </div>
          <div className="phone-input">
            <Form.Item
              label=""
              name="phone"
              rules={[
                { message: "Vui lòng nhập số điện thoại" },
                validatePhoneNumber(),
              ]}
            >
              <Input placeholder="Nhập số điện thoại" size="large" />
            </Form.Item>
          </div>

          <Row gutter={10}>
            <Col xs={12} md={12}>
              <Form.Item
                label=""
                name="province"
                rules={[{ required: true, message: "Vui lòng chọn thành phố" }]}
              >
                <Select
                  size="large"
                  placeholder="Chọn thành phố"
                  onChange={handleProvinceChange}
                >
                  <Option value="HN">Hà Nội</Option>
                  <Option value="HCM">TP Hồ Chí Minh</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={12} md={12}>
              <Form.Item
                label=""
                name="ward"
                rules={[
                  { required: form.getFieldValue("province"), message: "Vui lòng chọn Quận/Huyện" },
                ]}
              >
                <Select size="large" placeholder="Chọn Quận/Huyện">
                  {wardOptions.map((ward) => (
                    <Option key={ward} value={ward}>
                      {ward}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label=""
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn đầy đủ thông tin" }]}
          >
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Descriptions title="Sản phẩm cần tư vấn" />
          <Form.Item
            label=""
            name="items"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn đầy đủ thông tin",
              },
            ]}
          >
            <Checkbox.Group>
              <Row gutter={10}>
                <Col xs={12} md={12}>
                  <Checkbox value="item1">Thẻ tín dụng</Checkbox>
                </Col>
                <Col xs={12} md={12}>
                  <Checkbox value="item2">Mua trước trả sau</Checkbox>
                </Col>

                <Col xs={12} md={12}>
                  <Checkbox value="item3">Vay linh Hoạt</Checkbox>
                </Col>

                <Col xs={12} md={12}>
                  <Checkbox value="item4">Tài khoản M-Pro</Checkbox>
                </Col>
                <Col xs={12} md={12}>
                  <Checkbox value="item5">Tiền nhanh</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          {/* Textarea Description */}
          <Form.Item
            label=""
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}
          >
            <Input.TextArea rows={5} placeholder="Nhập thông tin" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default Request;
