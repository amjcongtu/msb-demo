import { Layout as LayoutCustom } from "antd";
import MenuCustom from "../Menu";
import Footer from "../Footer";
import './index.scss'
interface Props {
  children: React.ReactNode;
  isNotFoundPage?: boolean;
}
const { Content } = LayoutCustom;

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="wrapper-layout">
        <Content>
          <MenuCustom />
          <div className="main-layout">{children}</div>
          <Footer />
        </Content>
      </div>
    </>
  );
};
