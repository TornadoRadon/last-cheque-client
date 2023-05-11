import { Button, Form, Input, message, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Category from "../../../models/Category";
import { URL } from "../../../utils/properties";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";

export default function CategoryTab() {
  const queryClient = useQueryClient();

  const { confirm } = Modal;

  const columns: ColumnsType<Category> = [
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
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
              createCat(record);
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

  const { isLoading, data } = useQuery("categories", () =>
    axios.get(URL.shop.category).then((res) => {
      console.log("res.data:", res.data);
      let _data = res.data?.data as Category[];

      return _data;
    })
  );

  function showDeleteConfirm(cat: Category) {
    confirm({
      title: `Kategoriyani o'chirasizmi: ${cat.name}`,
      icon: <ExclamationCircleFilled />,
      content: `Aniqmi? Buni ortga qaytarib bo'lmaydi!`,
      okText: "Ha",
      okType: "danger",
      cancelText: `Yo'q`,
      closable: true,
      maskClosable: true,
      onOk() {
        let url = URL.shop.category + `/${cat.id}`;
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

  const [createform] = Form.useForm();
  function createCat(cat?: Category) {
    createform.setFieldValue("name", cat ? cat.name : "");
    Modal.info({
      title: "Kategoriya",
      closable: true,
      maskClosable: true,
      content: (
        <div>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            form={createform}
            name="create-cat"
            onFinish={() => {}}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="name" label="Nomi" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </div>
      ),
      onOk() {
        if (createform.getFieldValue("name")) {
          let url = URL.shop.category;
          if (cat) {
            url += `/${cat.id}`;
          }
          url += `?name=${createform.getFieldValue("name")}`;
          axios
            .post(url)
            .then((res) => {
              queryClient.invalidateQueries({ queryKey: ["categories"] });
            })
            .catch((res) => {
              if (res.response.status === 409)
                message.error(
                  "Bunday nomdagi kategoriya mavjud, iltimos boshqa kiriting!"
                );
              else message.error("Xatolik, qayta urinib ko'ring!");
            });
        }
      },
      onCancel() {},
    });
  }

  return (
    <>
      <Button
        icon={<PlusCircleFilled />}
        type={"primary"}
        onClick={() => {
          createCat();
        }}
      >
        Yangi
      </Button>
      <br />
      <Table
        size="small"
        pagination={false}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        bordered
      />
    </>
  );
}
