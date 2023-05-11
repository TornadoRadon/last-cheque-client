import {
  Button,
  Col,
  DatePicker,
  Divider,
  Row,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import Cheque, { PaymentType } from "../../models/Cheque";
import axios from "axios";
import { URL } from "../../utils/properties";
import { useQuery, useQueryClient } from "react-query";

export default function History() {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

  const columns: ColumnsType<Cheque> = [
    {
      title: "Vaqti",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (_, record) => {
        console.log(record.createdAt);
        return dayjs(record.createdAt).format("HH:mm");
      },
    },
    {
      title: "To'lov turi",
      dataIndex: "paymentType",
      key: "paymentType",
      align: "center",
      render: (_, record) => {
        let color = "default";
        let text = "-";
        switch (record.paymentType) {
          case PaymentType.CASH:
            color = "green";
            text = "naqd";
            break;
          case PaymentType.TERMINAL:
            color = "blue";
            text = "terminal";
            break;
          case PaymentType.P2P:
            color = "red";
            text = "o'tkazma";
            break;
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "To'lov",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: (_, record) => record.total?.toLocaleString(),
    },
    {
      title: "Raqami",
      dataIndex: "paymentNumber",
      key: "paymentNumber",
      align: "center",
    },
  ];

  const { isLoading, error, data, isFetching, isError } = useQuery(
    ["history", date],
    () => {
      return axios
        .get(URL.cheque.history + `?date=` + date.format("YYYY-MM-DD"))
        .then((res) => {
          console.log("res.data:", res.data);
          let _data = res.data?.data;
          _data.forEach((e: any) => {
            e.key = e.id;
          });
          return _data;
        });
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries("history");
  }, [date]);

  function dateSelector() {
    return (
      <Space size={"small"}>
        <Button
          icon={<StepBackwardOutlined />}
          onClick={() => setDate(date.subtract(1, "day"))}
        />
        <DatePicker
          value={date}
          allowClear={false}
          onChange={(d) => {
            if (d) setDate(d);
          }}
        />
        <Button
          icon={<StepForwardOutlined />}
          onClick={() => setDate(date.add(1, "day"))}
        />
      </Space>
    );
  }

  function expandedRowRenderer(record: any) {
    interface ExpandedDataType {
      key: React.Key;
      name: string;
      price: number;
      qty: number;
    }

    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Mahsulot", dataIndex: "name", key: "name" },
      { title: "Narxi", dataIndex: "price", key: "price" },
      { title: "Soni", dataIndex: "qty", key: "qty" },
    ];

    return (
      <Table
        size="small"
        columns={columns}
        dataSource={record.productList}
        pagination={false}
      />
    );
  }

  return (
    <>
      <Row justify={"center"}>
        <Col flex={"800px"}>
          <h2 style={{ textAlign: "center", fontWeight: 400 }}>Last Cheque</h2>

          <Row justify={"center"} wrap={false} gutter={24}>
            <Col>{dateSelector()}</Col>
            <Col>
              <Space.Compact style={{ width: 350 }}>
                {/* <Search placeholder="search..." allowClear /> */}
              </Space.Compact>
            </Col>
          </Row>

          <Divider></Divider>

          <Table
            size="small"
            loading={isLoading}
            columns={columns}
            dataSource={data}
            bordered
            expandable={{
              expandedRowRender: (record) => expandedRowRenderer(record),
              defaultExpandedRowKeys: ["0"],
              expandRowByClick: true,
            }}
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
}
