import { Col, Divider, Row, Tabs } from "antd";
import CategoryTab from "./components/CategoryTab";
import ProductTab from "./components/ProductTab";

export default function Settings() {
  return (
    <>
      <Row justify={"center"}>
        <Col flex={"800px"}>
          <h2 style={{ textAlign: "center", fontWeight: 400 }}>
            Kategoriya va Mahsulotlar
          </h2>

          <Divider />

          <Tabs
            tabPosition={"left"}
            destroyInactiveTabPane={true}
            items={[
              {
                label: `Kategoriya`,
                key: "1",
                children: <CategoryTab />,
              },
              {
                label: `Mahsulot`,
                key: "2",
                children: <ProductTab />,
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
}
