import { Button, Col, Divider, Row, Space, Spin, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import Category from "../../../models/Category";
import { CatCard } from "./CatCard";
import { useQuery } from "react-query";
import { URL } from "../../../utils/properties";
import axios from "axios";
import { CategoryAndProduct } from "../../../models/CategoryAndProduct";
import { useAppDispatch } from "../../../utils/hooks";
import { addProduct } from "./CartSlice";

export default function Shop() {
  const dispatch = useAppDispatch();

  const [selectedCatID, setSelectedCatID] = useState<number>(-1); //default selected All
  const [searchKW, search] = useState<string | undefined>();

  const { isLoading, error, data, isFetching, isError } = useQuery(
    "cats&Prods",
    () =>
      axios.get(URL.shop.categoryAndProduct).then((res) => {
        console.log("res.data:", res.data);
        let _data = res.data?.data as CategoryAndProduct;
        _data?.products.forEach((e) => (e.qty = 1));
        _data?.categories.unshift({
          id: -1,
          name: "Barchasi",
        });
        return _data;
      })
  );

  function renderCatsAndProds() {
    if (isLoading || isFetching) {
      return (
        <Row justify={"center"} wrap={false}>
          <Spin spinning={true}></Spin>
        </Row>
      );
    } else if (isError) {
      let err = error as any;
      console.log("error::", error);
      return (
        <Row justify={"center"} wrap={false}>
          <Tag color={"red"}>{err?.message}</Tag>
        </Row>
      );
    } else {
      return (
        <Row gutter={16} justify={"space-between"} wrap={false}>
          <Col flex={"256px"}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {data?.categories?.map((e: Category) => (
                <CatCard
                  cat={e}
                  selectedCatID={selectedCatID}
                  setSelectedCatID={setSelectedCatID}
                />
              ))}
            </Space>
          </Col>

          <Col flex={"36px"}>
            <Divider type="vertical" style={{ height: "100%" }}></Divider>
          </Col>

          <Col flex={"auto"}>
            <Space size={[8, 16]} wrap align="start">
              {data?.products
                ?.filter(
                  (e) => e.category.id === selectedCatID || selectedCatID === -1
                )
                ?.filter(
                  (e) =>
                    !(
                      searchKW !== undefined &&
                      searchKW.length > 2 &&
                      e.name.toLowerCase().indexOf(searchKW?.toLowerCase()) ===
                        -1
                    )
                )
                ?.map((e) => (
                  <Button
                    style={{
                      whiteSpace: "normal",
                      height: "auto",
                      width: 300,
                      minHeight: 86,
                      textAlign: "left",
                    }}
                    onClick={() => dispatch(addProduct(e))}
                  >
                    <Space direction="vertical" size="small" align="start">
                      <div style={{ fontWeight: 600, fontSize: 18 }}>
                        {e.name}
                      </div>
                      <div style={{ fontWeight: 500, fontSize: 16 }}>
                        {e.price.toLocaleString()} so'm
                      </div>
                    </Space>
                  </Button>
                ))}
            </Space>
          </Col>
        </Row>
      );
    }
  }

  return (
    <>
      <h2 style={{ textAlign: "center", fontWeight: 400 }}>Katalog</h2>

      <Row justify={"center"} wrap={false}>
        <Col>
          <Space.Compact style={{ width: 350 }}>
            <Search
              value={searchKW}
              placeholder="search..."
              allowClear
              onChange={(e) => search(e.target.value)}
            />
          </Space.Compact>
        </Col>
      </Row>

      <Divider></Divider>

      {renderCatsAndProds()}
    </>
  );
}
