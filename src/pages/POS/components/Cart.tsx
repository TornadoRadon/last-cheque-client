import {
  Badge,
  Button,
  Col,
  message,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import { DollarCircleFilled, DeleteOutlined } from "@ant-design/icons";
import { Item } from "./Item";
import { useAppSelector, useAppDispatch } from "../../../utils/hooks";
import { empty, setPaymentType } from "./CartSlice";
import axios from "axios";
import { URL } from "../../../utils/properties";
import { ChequeRTO, PaymentType } from "../../../models/Cheque";

const { Title } = Typography;

export const zeroMargin = { margin: 0 };

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function pay() {
    if (cart.products.length > 0) {
      console.log("cart:", cart);

      axios
        .post(URL.cheque.payment, {
          paymentType: cart.paymentType,
          productList: cart.products.map((e) => {
            return {
              productID: e.id,
              qty: e.qty,
            };
          }),
        } as ChequeRTO)
        .then((res) => {
          message.success("Ok!");
          dispatch(empty());
        })
        .catch((res) => message.error("Xatolik, qayta urinib ko'ring!"));
    }
  }

  function setPayment(e: any) {
    dispatch(setPaymentType(e));
  }

  function renderCount() {
    let total = 0;
    cart.products.forEach((e) => (total += e.qty));
    return total;
  }

  function renderTotal() {
    let total = 0;
    cart.products.forEach((e) => (total += e.price * e.qty));
    return total;
  }

  return (
    <div className="cart-fixed-content">
      <h2 style={{ textAlign: "center", fontWeight: 400 }}>
        <Space>
          <Button icon={<DeleteOutlined />} onClick={() => dispatch(empty())} />
          Savatcha
          <Badge count={renderCount()} />
        </Space>
      </h2>

      <div className="cart-fixed-content-items">
        {cart.products?.map((e) => (
          <Item product={e} />
        ))}
      </div>

      <div className="cart-fixed-bottom">
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Row justify={"space-between"} style={{ padding: "0 8px" }}>
            <Col>
              <Title level={5} style={zeroMargin}>
                Jami:
              </Title>
            </Col>
            <Col>
              <Title level={5} style={zeroMargin}>
                {renderTotal().toLocaleString()} so'm
              </Title>
            </Col>
          </Row>

          <Row justify={"space-between"} style={{ padding: "0 8px" }}>
            <Col>
              <Radio.Group
                value={cart.paymentType}
                buttonStyle="solid"
                onChange={(e) => setPayment(e.target.value)}
              >
                <Radio.Button value={PaymentType.CASH}>Naqd</Radio.Button>
                <Radio.Button value={PaymentType.TERMINAL}>
                  Terminal
                </Radio.Button>
                <Radio.Button value={PaymentType.P2P}>P2P</Radio.Button>
              </Radio.Group>
            </Col>

            <Col>
              <Button
                type="primary"
                style={{ width: 150 }}
                icon={<DollarCircleFilled />}
                onClick={() => pay()}
              >
                To'lov
              </Button>
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
}
