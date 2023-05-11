import { Col, Row } from "antd";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import "./index.css";

export default function POS() {
  return (
    <>
      <Row gutter={32} wrap={false}>
        <Col flex="550px">
          <Cart />
        </Col>

        <Col flex="auto">
          <Shop />
        </Col>
      </Row>
    </>
  );
}
