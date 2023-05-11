import { Button, Col, Row, Space, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { zeroMargin } from "./Cart";
import { ProductWithCat } from "../../../models/Product";
import { useAppDispatch } from "../../../utils/hooks";
import { minProduct, addProduct, removeProduct } from "./CartSlice";

const { Title } = Typography;

export function Item({ product }: { product: ProductWithCat }) {
  const dispatch = useAppDispatch();

  return (
    <>
      <Space direction="vertical" className="cart-item">
        <Row align={"middle"} gutter={16} wrap={false}>
          <Col>
            <Button
              icon={<DeleteOutlined />}
              type={"text"}
              onClick={() => dispatch(removeProduct(product))}
            />
          </Col>

          <Col flex="auto">
            <Title level={4} style={zeroMargin}>
              {product.name}
            </Title>
          </Col>

          <Col>
            <Space size={"middle"}>
              <Button
                icon={<MinusOutlined />}
                onClick={() => dispatch(minProduct(product))}
              />
              <Title level={5} style={zeroMargin}>
                {product.qty}
              </Title>
              <Button
                icon={<PlusOutlined />}
                onClick={() => dispatch(addProduct(product))}
              />
            </Space>
          </Col>
        </Row>

        <Row
          justify={"space-between"}
          style={{ padding: "0 8px" }}
          wrap={false}
        >
          <Col>
            <Title level={5} style={zeroMargin}>
              {product.price.toLocaleString()} so'm
            </Title>
          </Col>
          <Col>
            <Title level={5} style={zeroMargin}>
              {(product.price * product.qty).toLocaleString()} so'm
            </Title>
          </Col>
        </Row>
      </Space>
    </>
  );
}
