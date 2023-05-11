import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { ProductWithCat } from "../../../models/Product";
import { URL } from "../../../utils/properties";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { CategoryAndProduct } from "../../../models/CategoryAndProduct";

export default function ProductTab() {
  const queryClient = useQueryClient();
  const { confirm } = Modal;

  const { isLoading, data } = useQuery("cats&Prods-x", () =>
    axios.get(URL.shop.categoryAndProduct).then((res) => {
      console.log("res.data:", res.data);
      let _data = res.data?.data as CategoryAndProduct;
      return _data;
    })
  );

  const columns: ColumnsType<ProductWithCat> = [
    {
      title: "Kategoriya",
      dataIndex: "cat",
      key: "cat",
      align: "center",
      width: 172,
      render: (_, record) => <Tag>{record?.category.name}</Tag>,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      align: "right",
      width: 128,
      render: (_, record) => record?.price?.toLocaleString(),
    },
    {
      title: "• • •",
      dataIndex: "name",
      key: "name",
      width: 128,
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              createProd(record);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          />
        </Space>
      ),
    },
  ];

  function showDeleteConfirm(p: ProductWithCat) {
    confirm({
      title: `Mahsulotni o'chirasizmi: ${p.name}`,
      icon: <ExclamationCircleFilled />,
      content: `Aniqmi? Buni ortga qaytarib bo'lmaydi!`,
      okText: "Ha",
      okType: "danger",
      cancelText: `Yo'q`,
      closable: true,
      maskClosable: true,
      onOk() {
        let url = URL.shop.products + `/${p.id}`;
        axios
          .delete(url)
          .then((res) => {
            queryClient.invalidateQueries();
            Modal.destroyAll();
          })
          .catch((res) => {
            message.error("Xatolik, qayta urinib ko'ring!");
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const onFinish = (values: any) => {
    console.log("Success:", values);
    let url = URL.shop.products;
    axios
      .post(url, {
        id: values.id,
        name: values.name,
        price: values.price,
        catID: values.cat,
      })
      .then((res) => {
        queryClient.invalidateQueries();
        Modal.destroyAll();
      })
      .catch((res) => {
        if (res.response.status === 409)
          message.error(
            "Bunday nomdagi mahsulot mavjud, iltimos boshqa kiriting!"
          );
        else message.error("Xatolik, qayta urinib ko'ring!");
      });
  };

  const [createform] = Form.useForm();
  function createProd(prod?: ProductWithCat) {
    createform.setFieldValue("id", prod ? prod.id : "");
    createform.setFieldValue("name", prod ? prod.name : "");
    createform.setFieldValue("price", prod ? prod.price : "");
    createform.setFieldValue("cat", prod ? prod.category.id : null);
    Modal.info({
      title: "Mahsulot",
      closable: true,
      maskClosable: true,
      footer: <></>,
      content: (
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            form={createform}
            name="create-prod"
            onFinish={onFinish}
          >
            <Form.Item name="id" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Nomi"
              rules={[{ required: true, message: "Iltimos nomini kiriting!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Narxi"
              rules={[
                {
                  pattern: RegExp(`^[0-9]+$`),
                  required: true,
                  message: "Mahsulot narxini to'g'ri kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cat"
              label="Kategoriya"
              rules={[{ required: true, message: "Kategoriyani tanlang!" }]}
            >
              <Select>
                {data?.categories?.map((e) => (
                  <Select.Option value={e.id}>{e.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
      // onOk() {},
      onCancel() {},
    });
  }

  return (
    <>
      <Button
        icon={<PlusCircleFilled />}
        type={"primary"}
        onClick={() => {
          createProd();
        }}
      >
        Yangi
      </Button>
      <br />
      <Table
        size="small"
        loading={isLoading}
        columns={columns}
        dataSource={data?.products}
        bordered
      />
    </>
  );
}
