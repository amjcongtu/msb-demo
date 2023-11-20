import { useCallback } from "react";
import { useNavigate } from "react-router";
import { get } from "lodash";
import { Form, Input, Button, Modal, Col, Row, message } from "antd";
import { useLoginMutation } from "../../services/queries/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "../../router/routePaths";
import "./index.scss";
interface FormLoginEntry {
  username: string;
  password: string;
}
interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const Login = ({ isOpen, setIsOpen }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useLoginMutation();
  const { setAuth } = useAuth();

   
  const onFinish = (values: FormLoginEntry) => {
    handleLogin(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleLogin = useCallback(async (values: FormLoginEntry) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await login(values.username, values.password);
    if (result && result.status === 200) {
      setAuth(true); // set auth update menu
      setIsOpen(false);
      navigate(PATHS.profile());
    } else {
      setAuth(false); // set auth update menu
      const messErr = get(result, "data.message", "");
      console.log(messErr, "");

      const error = () => {
        messageApi.open({
          type: "error",
          content: messErr,
        });
      };
      error();
    }
  }, [login, messageApi, navigate, setAuth, setIsOpen]);

  const handleCancel = () => {
    onReset();
    setIsOpen(false);
  };

  const validateEmptyField = (label: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_: any, value: any) => {
      return new Promise((resolve, reject) => {
        if (value) {
          resolve(true); // Resolve if validation passes
        } else {
          reject(`Vui lòng nhập ${label.toLowerCase()}`);
        }
      });
    };
  };

  return (
    <>
      <Modal
        title="Đăng nhập"
        open={isOpen}
        footer={null}
        width={340}
        maskClosable={false}
        closeIcon={null}
        centered
      >
        <Form
          form={form}
          name="loginForm"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Tên tài khoản"
            rules={[{ validator: validateEmptyField("Tên tài khoản") }]}
          >
            <Input size="large" placeholder="Nhập tên tài khoản" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ validator: validateEmptyField("Mật khẩu") }]}
          >
            <Input size="large" type="password" placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Row justify="space-between" gutter={10}>
              <Col span={12}>
                <Button
                  className="btn-close"
                  block
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Đóng
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  className="btn-login"
                  block
                  htmlType="submit"
                  type="primary"
                >
                  Đăng nhập
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        {contextHolder}
      </Modal>
    </>
  );
};

export default Login;
