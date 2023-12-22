import React from "react";
import { Layout, Space } from "antd";
import "./style.css";
import SearchBar from "../components/searchbar";
import ItemContainer from "../components/itemcontainer";
import LogoImg from "../utils/assets/images/logo-img.png";
import "../utils/assets/responsivecss/responsive.css"
const { Header, Content } = Layout;

const Home = () => {
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: "auto",
    paddingInline: 50,
    lineHeight: "64px",
    padding: "2px 0",
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      className="container"
    >
      <Layout>
        <Header style={headerStyle} className="header-section">
          <div className="heading-container-topbar">
            <div className="logo-img">
              <img src={LogoImg} alt="" />
            </div>
          </div>
        </Header>
        <Content className="main-section">
          <SearchBar />
          <ItemContainer />
        </Content>
        {/* <Footer className="footer-section">Footer</Footer> */}
      </Layout>
    </Space>
  );
};
export default Home;
